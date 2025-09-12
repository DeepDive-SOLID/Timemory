package solid.backend.team.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.entity.Team;
import solid.backend.entity.TeamMember;
import solid.backend.entity.TeamMemberId;
import solid.backend.exception.CustomException;
import solid.backend.exception.ErrorCode;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.TeamMemberRepository;
import solid.backend.jpaRepository.TeamRepository;
import solid.backend.member.repository.MemberQueryRepository;
import solid.backend.team.repository.TeamQueryRepository;
import solid.backend.member.dto.MemberProfileDto;
import solid.backend.team.dto.TeamCreateRequestDto;
import solid.backend.team.dto.TeamMemberDto;
import solid.backend.team.dto.TeamRequestDto;
import solid.backend.team.dto.TeamResponseDto;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 팀(그룹) 관련 비즈니스 로직 구현체
 * @author Timemory Team
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {
    
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final MemberRepository memberRepository;
    private final TeamQueryRepository teamQueryRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final FileManager fileManager;
    
    /**
     * 새로운 팀 생성 및 멤버 초대
     * 생성자는 자동으로 팀의 첫 번째 멤버가 됨
     * @param requestDto 팀 생성 요청 정보 (팀명, 초대할 닉네임 리스트)
     * @param creatorId 팀 생성자 ID (카카오 회원 ID)
     * @return 생성된 팀 정보
     * @throws CustomException 생성자가 존재하지 않을 경우
     */
    @Override
    @Transactional
    @CacheEvict(value = "memberTeams", key = "#p1")
    public TeamResponseDto createTeam(TeamCreateRequestDto requestDto, String creatorId) {
        // 생성자 확인
        Member creator = memberRepository.findById(creatorId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        
        // 기념일용 팀 이름 사용 방지
        if (requestDto.getTeamName() != null && requestDto.getTeamName().startsWith("TIME_CAPSULE_")) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }
        
        // 팀 생성
        Team team = Team.builder()
                .teamName(requestDto.getTeamName())
                .build();
        
        Team savedTeam = teamRepository.save(team);
        
        // 생성자를 팀 멤버로 추가
        TeamMemberId teamMemberId = new TeamMemberId(savedTeam.getTeamId(), creatorId);
        TeamMember teamMember = TeamMember.builder()
                .id(teamMemberId)
                .team(savedTeam)
                .member(creator)
                .build();
        
        teamMemberRepository.save(teamMember);
        
        // 초대할 멤버들 추가
        if (requestDto.getInviteNicknames() != null && !requestDto.getInviteNicknames().isEmpty()) {
            for (String nickname : requestDto.getInviteNicknames()) {
                try {
                    addTeamMemberByNickname(savedTeam.getTeamId(), nickname);
                } catch (CustomException e) {
                    log.warn("팀 멤버 초대 실패: nickname={}, error={}", nickname, e.getMessage());
                }
            }
        }
        
        log.info("팀 생성 완료: teamId={}, creatorId={}", savedTeam.getTeamId(), creatorId);
        return getTeamDetail(savedTeam.getTeamId());
    }
    
    /**
     * 전체 팀 목록 조회 (기념일용 팀 제외)
     * @return 일반 팀 목록
     */
    @Override
    public List<TeamResponseDto> getAllTeams() {
        List<Team> teams = teamRepository.findAllNonAnniversaryTeams();
        return teams.stream()
                .map(team -> getTeamDetail(team.getTeamId()))
                .collect(Collectors.toList());
    }
    
    /**
     * 팀에 속한 멤버 목록 조회
     * 캐싱: 팀 멤버 목록은 자주 조회되므로 캐싱하여 성능 향상
     * 캐시 무효화: 팀 멤버 추가/탈퇴 시 자동으로 캐시 삭제됨
     * 
     * @param teamId 팀 ID
     * @return 팀 멤버 목록
     * @throws CustomException 팀이 존재하지 않을 경우
     */
    @Override
    @Cacheable(value = "teams", key = "#p0")  // 캐시명: teams, 키: teamId
    public List<TeamMemberDto> getTeamMembers(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        
        // 기념일용 팀 접근 차단
        if (team.getTeamName() != null && team.getTeamName().startsWith("TIME_CAPSULE_")) {
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        
        List<TeamMember> teamMembers = teamMemberRepository.findByTeamTeamId(teamId);
        return teamMembers.stream()
                .map(teamMember -> TeamMemberDto.from(teamMember, fileManager))
                .collect(Collectors.toList());
    }
    
    /**
     * 팀 탈퇴 처리
     * - 본인만 탈퇴 가능 (그룹장 개념 없음)
     * - 팀 멤버가 0명이 되면 팀 자동 삭제
     * 캐시 무효화: 
     * - teams 캐시: 해당 팀의 멤버 목록이 변경되므로 캐시 삭제
     * - memberTeams 캐시: 탈퇴한 멤버의 팀 목록이 변경되므로 캐시 삭제
     * 
     * @param teamId 팀 ID
     * @param memberId 탈퇴할 회원 ID
     * @param requesterId 요청자 ID (JWT 토큰에서 추출)
     * @throws CustomException 팀이나 멤버가 존재하지 않을 경우, 권한이 없을 경우
     */
    @Override
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "teams", key = "#p0"),        // 팀 멤버 목록 캐시 삭제
        @CacheEvict(value = "memberTeams", key = "#p1")  // 멤버의 팀 목록 캐시 삭제
    })
    public void leaveTeam(Integer teamId, String memberId, String requesterId) {
        // 본인 확인 (보안 검증)
        if (!memberId.equals(requesterId)) {
            log.warn("권한 없는 팀 탈퇴 시도: teamId={}, memberId={}, requesterId={}", 
                    teamId, memberId, requesterId);
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }
        
        // 팀 존재 확인
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        
        // 기념일용 팀 접근 차단
        if (team.getTeamName() != null && team.getTeamName().startsWith("TIME_CAPSULE_")) {
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        
        // 멤버가 팀에 속해있는지 확인
        TeamMemberId teamMemberId = new TeamMemberId(teamId, memberId);
        TeamMember teamMember = teamMemberRepository.findById(teamMemberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_TEAM_MEMBER));
        
        // 팀 멤버 삭제
        teamMemberRepository.delete(teamMember);
        log.info("팀 탈퇴 처리: teamId={}, memberId={}", teamId, memberId);
        
        // 팀 멤버가 0명이 되면 팀 자동 삭제
        long remainingMembers = teamQueryRepository.countMembersByTeamId(teamId);
        if (remainingMembers == 0) {
            teamRepository.deleteById(teamId);
            log.info("팀 자동 삭제 (멤버 0명): teamId={}", teamId);
        }
    }
    
    /**
     * 팀에 새로운 멤버 추가 (닉네임으로)
     * 캐시 무효화: 팀 멤버 목록이 변경되므로 해당 팀의 캐시 삭제
     * Note: 추가된 멤버의 memberTeams 캐시는 해당 멤버가 다음 조회 시 갱신됨
     * 
     * @param teamId 팀 ID
     * @param nickname 추가할 회원의 닉네임
     * @return 추가된 멤버의 프로필 정보 (닉네임, 프로필 이미지 포함)
     * @throws CustomException 팀이나 멤버가 존재하지 않거나 이미 팀원인 경우
     */
    @Override
    @Transactional
    @CacheEvict(value = "teams", key = "#p0")  // 팀 멤버 목록 캐시 삭제
    public MemberProfileDto addTeamMemberByNickname(Integer teamId, String nickname) {
        // 팀 존재 확인
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        
        // 기념일용 팀 접근 차단
        if (team.getTeamName() != null && team.getTeamName().startsWith("TIME_CAPSULE_")) {
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        
        // 닉네임으로 멤버 찾기
        Member member = memberRepository.findByMemberNickname(nickname)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        
        // 이미 팀 멤버인지 확인
        TeamMemberId teamMemberId = new TeamMemberId(teamId, member.getMemberId());
        if (teamMemberRepository.existsById(teamMemberId)) {
            throw new CustomException(ErrorCode.ALREADY_TEAM_MEMBER);
        }
        
        // 팀 멤버로 추가
        TeamMember teamMember = TeamMember.builder()
                .id(teamMemberId)
                .team(team)
                .member(member)
                .build();
        
        teamMemberRepository.save(teamMember);
        log.info("팀 멤버 추가 완료: teamId={}, nickname={}, memberId={}", 
                teamId, nickname, member.getMemberId());
        
        // 추가된 멤버의 프로필 정보 반환
        return MemberProfileDto.from(member, fileManager);
    }
    
    /**
     * 팀 정보 수정
     * @param teamId 팀 ID
     * @param requestDto 수정할 팀 정보
     * @return 수정된 팀 상세 정보
     * @throws CustomException 팀이 존재하지 않을 경우
     */
    @Override
    @Transactional
    public TeamResponseDto updateTeam(Integer teamId, TeamRequestDto requestDto) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        
        // 팀 정보 업데이트
        if (requestDto.getTeamName() != null) {
            team.setTeamName(requestDto.getTeamName());
        }
        
        Team updatedTeam = teamRepository.save(team);
        log.info("팀 정보 수정 완료: teamId={}", teamId);
        return getTeamDetail(updatedTeam.getTeamId());
    }
    
    /**
     * 특정 회원이 속한 팀 목록 조회
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 팀 목록 (멤버 수, 멤버 프로필 포함)
     */
    @Override
    public List<TeamResponseDto> getMemberTeams(String memberId) {
        // 회원 존재 확인
        if (!memberRepository.existsById(memberId)) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        
        List<Team> teams = memberQueryRepository.findTeamsByMemberId(memberId);
        return teams.stream()
                .map(team -> getTeamDetail(team.getTeamId()))
                .collect(Collectors.toList());
    }
    
    /**
     * 팀 상세 정보 조회 (멤버 수, 멤버 프로필 포함)
     * @param teamId 팀 ID
     * @return 팀 상세 정보
     */
    @Override
    public TeamResponseDto getTeamDetail(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        
        // 기념일용 팀 접근 차단
        if (team.getTeamName() != null && team.getTeamName().startsWith("TIME_CAPSULE_")) {
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        
        // 팀 멤버 목록 조회
        List<Member> members = teamQueryRepository.findMembersByTeamId(teamId);
        List<MemberProfileDto> memberProfiles = members.stream()
                .map(member -> MemberProfileDto.from(member, fileManager))
                .collect(Collectors.toList());
        
        return TeamResponseDto.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .memberCount(memberProfiles.size())
                .members(memberProfiles)
                .build();
    }
}
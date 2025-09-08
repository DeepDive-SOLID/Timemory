package solid.backend.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.entity.Team;
import solid.backend.exception.CustomException;
import solid.backend.exception.ErrorCode;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.jpaRepository.TeamRepository;
import solid.backend.member.repository.MemberQueryRepository;
import solid.backend.team.repository.TeamQueryRepository;
import solid.backend.member.dto.MemberProfileDto;
import solid.backend.member.dto.MemberResponseDto;
import solid.backend.team.dto.TeamResponseDto;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 회원 관련 비즈니스 로직 구현체
 * @author Timemory Team
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final TeamQueryRepository teamQueryRepository;
    private final FileManager fileManager;
    
    /**
     * 회원 정보 조회
     * 캐싱: 회원 정보는 자주 변경되지 않으므로 캐싱하여 DB 조회 최소화
     * 
     * @param memberId 카카오 회원 ID
     * @return 회원 정보 DTO
     * @throws CustomException 회원이 존재하지 않을 경우
     */
    @Override
    @Cacheable(value = "memberInfo", key = "#memberId")  // 캐시명: memberInfo, 키: memberId
    public MemberResponseDto getMember(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return MemberResponseDto.from(member, fileManager);
    }
    
    /**
     * 회원이 속한 팀 목록 조회 (상세 정보 포함)
     * 캐싱: 팀 목록은 자주 조회되지만 변경 빈도가 낮아 캐싱 효과가 높음
     * 
     * 참고: 이 캐시는 다른 서비스에서 팀 관련 변경 시 자동으로 무효화됩니다
     * - TeamService.createTeam(): 팀 생성자의 memberTeams 캐시 삭제
     * - TeamService.leaveTeam(): 탈퇴한 회원의 memberTeams 캐시 삭제
     * 
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 팀 목록 (멤버 수, 멤버 프로필 포함)
     * @throws CustomException 회원이 존재하지 않을 경우
     */
    @Override
    @Cacheable(value = "memberTeams", key = "#memberId")  // 캐시명: memberTeams, 키: memberId
    public List<TeamResponseDto> getMemberTeams(String memberId) {
        if (!memberRepository.existsById(memberId)) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        List<Team> teams = memberQueryRepository.findTeamsByMemberId(memberId);
        return teams.stream()
                .map(team -> {
                    List<Member> members = teamQueryRepository.findMembersByTeamId(team.getTeamId());
                    List<MemberProfileDto> memberProfiles = members.stream()
                            .map(member -> MemberProfileDto.from(member, fileManager))
                            .collect(Collectors.toList());
                    
                    return TeamResponseDto.builder()
                            .teamId(team.getTeamId())
                            .teamName(team.getTeamName())
                            .memberCount(memberProfiles.size())
                            .members(memberProfiles)
                            .build();
                })
                .collect(Collectors.toList());
    }
    
    /**
     * 닉네임으로 회원 검색
     * @param nickname 검색할 닉네임
     * @return 회원 정보 DTO
     * @throws CustomException 회원이 존재하지 않을 경우
     */
    @Override
    public MemberResponseDto searchMemberByNickname(String nickname) {
        Member member = memberRepository.findByMemberNickname(nickname)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return MemberResponseDto.from(member, fileManager);
    }
}
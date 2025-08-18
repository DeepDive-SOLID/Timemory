package solid.backend.team.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import solid.backend.exception.CustomException;
import solid.backend.exception.ErrorCode;
import solid.backend.team.dto.TeamCreateRequestDto;
import solid.backend.team.dto.TeamMemberDto;
import solid.backend.team.dto.TeamMemberRequestDto;
import solid.backend.team.dto.TeamRequestDto;
import solid.backend.team.dto.TeamResponseDto;
import solid.backend.team.service.TeamService;

import java.security.Principal;
import java.util.List;

/**
 * 팀(그룹) 관련 API 컨트롤러
 * @author Timemory Team
 */
@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {
    
    private final TeamService teamService;
    
    /**
     * 새로운 팀 생성 및 멤버 초대
     * 생성자는 자동으로 팀 멤버로 추가됨
     * @param requestDto 팀 생성 요청 정보 (팀명, 초대할 닉네임 리스트)
     * @param principal JWT 인증 정보
     * @return 생성된 팀 상세 정보
     */
    @PostMapping
    public ResponseEntity<TeamResponseDto> createTeam(
            @RequestBody TeamCreateRequestDto requestDto,
            Principal principal) {
        // JWT에서 사용자 ID 추출 (카카오 ID)
        String creatorId = principal.getName();
        TeamResponseDto response = teamService.createTeam(requestDto, creatorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * 전체 팀 목록 조회
     * @return 전체 팀 목록
     */
    @GetMapping
    public ResponseEntity<List<TeamResponseDto>> getAllTeams() {
        List<TeamResponseDto> response = teamService.getAllTeams();
        return ResponseEntity.ok(response);
    }
    
    /**
     * 팀 상세 정보 조회 (멤버 수, 멤버 프로필 포함)
     * @param teamId 팀 ID
     * @return 팀 상세 정보
     */
    @GetMapping("/{teamId}")
    public ResponseEntity<TeamResponseDto> getTeam(@PathVariable("teamId") Integer teamId) {
        TeamResponseDto response = teamService.getTeamDetail(teamId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 팀에 속한 멤버 목록 조회
     * @param teamId 팀 ID
     * @return 팀 멤버 목록
     */
    @GetMapping("/{teamId}/members")
    public ResponseEntity<List<TeamMemberDto>> getTeamMembers(@PathVariable("teamId") Integer teamId) {
        List<TeamMemberDto> response = teamService.getTeamMembers(teamId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 팀 탈퇴
     * - 본인만 탈퇴 가능 (그룹장 개념 없음)
     * - 팀 멤버가 0명이 되면 팀 자동 삭제
     * @param teamId 팀 ID
     * @param memberId 탈퇴할 회원 ID
     * @param principal JWT 인증 정보
     * @return 204 No Content
     */
    @DeleteMapping("/{teamId}/members/{memberId}")
    public ResponseEntity<Void> leaveTeam(
            @PathVariable("teamId") Integer teamId,
            @PathVariable("memberId") String memberId,
            Principal principal) {
        
        // JWT에서 인증된 사용자 ID 추출
        String requesterId = principal.getName();
        
        teamService.leaveTeam(teamId, memberId, requesterId);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * 팀에 새로운 멤버 추가 (닉네임으로)
     * @param teamId 팀 ID
     * @param requestDto 추가할 회원 정보 (닉네임)
     * @return 201 Created
     */
    @PostMapping("/{teamId}/members")
    public ResponseEntity<Void> addTeamMember(
            @PathVariable("teamId") Integer teamId,
            @RequestBody TeamMemberRequestDto requestDto) {
        
        // 닉네임이 제공되지 않은 경우
        if (requestDto.getNickname() == null || requestDto.getNickname().isEmpty()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }
        
        teamService.addTeamMemberByNickname(teamId, requestDto.getNickname());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
    /**
     * 팀 정보 수정
     * @param teamId 팀 ID
     * @param requestDto 수정할 팀 정보
     * @return 수정된 팀 상세 정보
     */
    @PutMapping("/{teamId}")
    public ResponseEntity<TeamResponseDto> updateTeam(
            @PathVariable("teamId") Integer teamId,
            @RequestBody TeamRequestDto requestDto) {
        TeamResponseDto response = teamService.updateTeam(teamId, requestDto);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 특정 회원이 속한 팀 목록 조회 (상세 정보 포함)
     * @param memberId 카카오 회원 ID
     * @return 회원이 속한 팀 목록 (멤버 수, 멤버 프로필 포함)
     */
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<TeamResponseDto>> getMemberTeams(@PathVariable("memberId") String memberId) {
        List<TeamResponseDto> response = teamService.getMemberTeams(memberId);
        return ResponseEntity.ok(response);
    }
}
package solid.backend.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import solid.backend.member.dto.MemberResponseDto;
import solid.backend.member.service.MemberService;
import solid.backend.team.dto.TeamResponseDto;

import java.util.List;

/**
 * 회원 관련 API 컨트롤러
 * @author Timemory Team
 */
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;
    
    /**
     * 회원 정보 조회
     * @param memberId 카카오 회원 ID
     * @return 회원 정보
     */
    @GetMapping("/{memberId}")
    public ResponseEntity<MemberResponseDto> getMember(@PathVariable("memberId") String memberId) {
        MemberResponseDto response = memberService.getMember(memberId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 회원이 속한 팀 목록 조회 (상세 정보 포함)
     * @param memberId 카카오 회원 ID
     * @return 팀 목록 (멤버 수, 멤버 프로필 포함)
     */
    @GetMapping("/{memberId}/teams")
    public ResponseEntity<List<TeamResponseDto>> getMemberTeams(@PathVariable("memberId") String memberId) {
        List<TeamResponseDto> teams = memberService.getMemberTeams(memberId);
        return ResponseEntity.ok(teams);
    }
    
    /**
     * 닉네임으로 회원 검색 (정확히 일치)
     * @param nickname 검색할 닉네임
     * @return 회원 정보
     */
    @GetMapping("/search/exact")
    public ResponseEntity<MemberResponseDto> searchMemberByNickname(@RequestParam("nickname") String nickname) {
        MemberResponseDto response = memberService.searchMemberByNickname(nickname);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 닉네임으로 회원 검색 (부분 일치)
     * @param keyword 검색 키워드
     * @return 검색된 회원 목록
     */
    @GetMapping("/search")
    public ResponseEntity<List<MemberResponseDto>> searchMembers(@RequestParam("keyword") String keyword) {
        List<MemberResponseDto> response = memberService.searchMembersByNicknameContaining(keyword);
        return ResponseEntity.ok(response);
    }
}
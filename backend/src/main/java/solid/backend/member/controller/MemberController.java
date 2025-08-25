package solid.backend.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import solid.backend.member.dto.MemberResponseDto;
import solid.backend.member.service.MemberService;
import solid.backend.team.dto.TeamResponseDto;

import java.security.Principal;
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
     * 내 프로필 조회
     * JWT 토큰에서 추출한 회원 ID로 조회
     * @param principal JWT 인증 정보
     * @return 회원 정보
     */
    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyProfile(Principal principal) {
        String memberId = principal.getName();
        MemberResponseDto response = memberService.getMember(memberId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 내가 속한 팀 목록 조회 (상세 정보 포함)
     * JWT 토큰에서 추출한 회원 ID로 조회
     * @param principal JWT 인증 정보
     * @return 팀 목록 (멤버 수, 멤버 프로필 포함)
     */
    @GetMapping("/me/teams")
    public ResponseEntity<List<TeamResponseDto>> getMyTeams(Principal principal) {
        String memberId = principal.getName();
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
}
package solid.backend.mypage.service;

import solid.backend.mypage.dto.MypageDto;
import solid.backend.mypage.dto.MypageUpdDto;

public interface MypageService {

    /**
     * 설명 : 회원 정보 조회
     * @param memberId
     * @return MypageDto
     */
    MypageDto getMemberDto(String memberId);

    /**
     * 설명 : 회원 정보 수정
     * @param memberDto
     */
    void updateMemberDto(MypageUpdDto memberDto);

    /**
     * 설명 : 회원 정보 삭제
     * @param memberId
     */
    void deleteMemberDto(String memberId);
}

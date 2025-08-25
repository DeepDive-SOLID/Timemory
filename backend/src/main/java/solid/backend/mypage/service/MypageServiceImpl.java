package solid.backend.mypage.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.mypage.dto.MypageDto;
import solid.backend.mypage.dto.MypageUpdDto;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final MemberRepository memberRepository;
    private final FileManager fileManager;

    /**
     * 설명 : 회원 정보 조회
     * @param memberId
     * @return MypageDto
     */
    @Override
    public MypageDto getMemberDto(String memberId) {
        return memberRepository.findById(memberId)
                .map(member -> new MypageDto(
                        member.getMemberName(),
                        member.getMemberNickname(),
                        member.getMemberEmail(),
                        member.getMemberPhone(),
                        member.getMemberBirth(),
                        member.getMemberProfile() != null ? fileManager.getFileUrl(member.getMemberProfile()) : null
                ))
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberId));
    }

    /**
     * 설명 : 회원 정보 수정
     * @param memberDto
     */
    @Override
    @Transactional
    public void updateMemberDto(MypageUpdDto memberDto) {
        Member member = memberRepository.findById(memberDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberDto.getMemberId()));

        member.setMemberName(memberDto.getMemberName());
        member.setMemberEmail(memberDto.getMemberEmail());
        member.setMemberPhone(memberDto.getMemberPhone());
        member.setMemberBirth(memberDto.getMemberBirth());

        if (memberDto.getMemberProfile() != null) {
            // 기존 이미지 파일 삭제
            if (member.getMemberProfile() != null) fileManager.deleteFile(member.getMemberProfile());
            // 새로운 이미지 파일 저장
            String savedPath = fileManager.addFile(memberDto.getMemberProfile(), "member");
            member.setMemberProfile(savedPath);
        }

        memberRepository.save(member);
    }

    /**
     * 설명 : 회원 정보 삭제
     * @param memberId
     */
    @Override
    @Transactional
    public void deleteMemberDto(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberId));

        // 기존 이미지 파일 삭제
        if (member.getMemberProfile() != null) {
            fileManager.deleteFile(member.getMemberProfile());
        }

        memberRepository.deleteById(memberId);
    }
}

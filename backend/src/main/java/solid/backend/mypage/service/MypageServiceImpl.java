package solid.backend.mypage.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import solid.backend.common.FileManager;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.*;
import solid.backend.mypage.dto.MypageDto;
import solid.backend.mypage.dto.MypageUpdDto;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final MemberRepository memberRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final AlarmRepository alarmRepository;
    private final CapsuleRepository capsuleRepository;
    private final FileManager fileManager;

    /**
     * 설명 : 회원 정보 조회 - 캐시 적용
     * @param memberId 조회할 회원 ID
     * @return MypageDto 회원 정보
     */
    @Override
    @Cacheable(value = "mypageInfo", key = "#p0")
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
     * 설명 : 회원 정보 수정 - 캐시 무효화
     * @param memberDto 수정할 회원 정보
     */
    @Override
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "mypageInfo", key = "#p0.memberId"),
        @CacheEvict(value = "memberInfo", key = "#p0.memberId", condition = "#p0.memberId != null")
    })
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
     * 설명 : 회원 정보 삭제 - 모든 관련 캐시 무효화
     * @param memberId 삭제할 회원 ID
     */
    @Override
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "mypageInfo", key = "#p0"),
        @CacheEvict(value = "memberInfo", key = "#p0", condition = "#p0 != null"),
        @CacheEvict(value = "memberTeams", key = "#p0", condition = "#p0 != null"),
        @CacheEvict(value = "teams", allEntries = true)  // 팀 캐시도 무효화 (해당 회원이 포함된 팀들)
    })
    public void deleteMemberDto(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다. " + memberId));

        // 기존 이미지 파일 삭제
        if (member.getMemberProfile() != null) {
            fileManager.deleteFile(member.getMemberProfile());
        }

        teamMemberRepository.deleteByMember(member);
        alarmRepository.deleteByMember(member);
        capsuleRepository.deleteByMember(member);
        memberRepository.deleteById(memberId);
    }
}

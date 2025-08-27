package solid.backend.capsule.space.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.space.dto.CapsuleSpaceResponseDto;
import solid.backend.capsule.space.dto.CapsuleSummaryDto;
import solid.backend.capsule.space.repository.CapsuleSpaceQueryRepository;
import solid.backend.entity.Capsule;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.CapsuleRepository;
import solid.backend.jpaRepository.MemberRepository;
import solid.backend.exception.CustomException;
import solid.backend.exception.ErrorCode;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CapsuleSpaceServiceImpl implements CapsuleSpaceService {
    
    private final MemberRepository memberRepository;
    private final CapsuleRepository capsuleRepository;
    private final CapsuleSpaceQueryRepository capsuleSpaceQueryRepository;
    
    @Override
    public CapsuleSpaceResponseDto getCapsuleSpace(String memberId) {
        log.debug("캡슐 공간 조회 시작 - memberId: {}", memberId);
        
        // 회원 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> {
                    log.error("존재하지 않는 회원 - memberId: {}", memberId);
                    return new CustomException(ErrorCode.MEMBER_NOT_FOUND);
                });
        
        // 회원이 작성한 모든 캡슐 조회 (기념일 캡슐 포함)
        List<Capsule> capsules = capsuleSpaceQueryRepository.findCapsulesByMemberId(memberId);
        log.debug("조회된 캡슐 개수: {}", capsules.size());
        
        // DTO 변환
        List<CapsuleSummaryDto> capsuleSummaries = capsules.stream()
                .map(CapsuleSummaryDto::from)
                .collect(Collectors.toList());
        
        return CapsuleSpaceResponseDto.builder()
                .memberId(memberId)
                .memberNickname(member.getMemberNickname())
                .totalCapsules(capsuleSummaries.size())
                .capsules(capsuleSummaries)
                .build();
    }
    
    @Override
    @Transactional
    public void deleteCapsule(String memberId, Integer capsuleId) {
        // 캡슐 조회
        Capsule capsule = capsuleRepository.findById(capsuleId)
                .orElseThrow(() -> new CustomException(ErrorCode.CAPSULE_NOT_FOUND));
        
        // 작성자 확인
        if (!capsule.getMember().getMemberId().equals(memberId)) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }
        
        // 캡슐 삭제 로그
        log.info("캡슐 삭제 - capsuleId: {}, teamId: {}, memberId: {}", 
                capsuleId, capsule.getTeam().getTeamId(), memberId);
        
        // 캡슐 삭제
        capsuleRepository.delete(capsule);
    }
}
package solid.backend.capsule.space.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import solid.backend.capsule.space.dto.CapsuleSpaceResponseDto;
import solid.backend.capsule.space.dto.CapsuleSummaryDto;
import solid.backend.capsule.space.repository.CapsuleSpaceQueryRepository;
import solid.backend.capsule.date.service.CapsuleDateService;
import solid.backend.capsule.cndt.service.CapsuleCndtService;
import solid.backend.common.FileManager;
import solid.backend.entity.Capsule;
import solid.backend.entity.Member;
import solid.backend.jpaRepository.AlarmRepository;
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
    private final CapsuleDateService capsuleDateService;
    private final CapsuleCndtService capsuleCndtService;
    private final FileManager fileManager;
    private final AlarmRepository alarmRepository;
    
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
        log.info("캡슐 삭제 시작 - capsuleId: {}, teamId: {}, memberId: {}", 
                capsuleId, capsule.getTeam().getTeamId(), memberId);
        
        // 모든 캡슐 타입에 대해 관련 알람 먼저 삭제 (외래키 제약 조건 해결)
        alarmRepository.deleteByCapsule(capsule);
        log.debug("캡슐 관련 알람 삭제 완료 - capsuleId: {}", capsuleId);
        
        // 캡슐 타입에 따른 삭제 처리
        if (capsule.getCapsuleLocation() != null) {
            // 위치 캡슐인 경우 - 파일 삭제 후 캡슐 삭제
            log.debug("위치 캡슐 삭제 - capsuleId: {}", capsuleId);
            
            if (capsule.getCapImg() != null) {
                fileManager.deleteFile(capsule.getCapImg());
                log.debug("캡슐 이미지 파일 삭제 완료 - file: {}", capsule.getCapImg());
            }
            capsuleRepository.delete(capsule);
        } else if (capsule.getCapsuleCondition() != null) {
            // 조건 캡슐인 경우 - CapsuleCndtService 사용 (파일 삭제 포함)
            log.debug("조건 캡슐 삭제 - capsuleId: {}", capsuleId);
            capsuleCndtService.deleteCapsuleDate(capsuleId);
        } else {
            // 날짜 캡슐인 경우 - CapsuleDateService 사용 (파일 삭제 포함)
            log.debug("날짜 캡슐 삭제 - capsuleId: {}", capsuleId);
            capsuleDateService.deleteCapsuleDate(capsuleId);
        }
        
        log.info("캡슐 삭제 완료 - capsuleId: {}", capsuleId);
    }
}
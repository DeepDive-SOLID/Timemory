import style from "../../../styles/ConditionCapsule.module.scss";
import type { CapsuleCndtListDto } from "../../../types/capsule";

import { lock, mini_logo } from "../../../assets";
import ProgressBar from "./ProgressBar";
import useProgress from "../../../hooks/useProgress";
import { useNavigate } from "react-router-dom";
import CapsuleOpenConfirm from "../../UI/CapsuleOpenConfirm";
import { useContext, useState } from "react";
import { getCapsuleCndtListApi } from "../../../api/open";
import { AuthContext } from "../../../contexts/AuthContext";

interface ConditionCapsuleProps {
  capsuleCndt: CapsuleCndtListDto[] | undefined;
  handleDeleteCndt: () => void;
}

const ConditionCapsule = ({ capsuleCndt, handleDeleteCndt }: ConditionCapsuleProps) => {
  const { scrollRef, scrollProgress, progressBarRef, handleProgressClick, handleMouseDown } = useProgress();
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCndt, setSelectedCndt] = useState<string>();
  const { userInfo } = useContext(AuthContext)!;

  const clickEvent = (isLocked: boolean, capId: number) => {
    if (!isLocked) {
      navigate(`/detail/${capId}`);
    }
  };
  const handleCapusleOpen = (cardId: number, cndt: string) => {
    setSelectedCardId(cardId);
    setSelectedCndt(cndt);
    setShowCapsuleModal((prev) => !prev);
  };
  const handleCapsuleOpenCancel = () => {
    setShowCapsuleModal(false);
    setSelectedCardId(null);
  };

  const handleCapsuleOpen = async () => {
    if (selectedCardId && !isOpening) {
      try {
        setIsOpening(true);
        await getCapsuleCndtListApi(selectedCardId);
        // 성공하면 상위 컴포넌트에 알림
        if (handleDeleteCndt) {
          handleDeleteCndt();
        }
        // 모달 닫기
        setShowCapsuleModal(false);
        setSelectedCardId(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "캡슐 오픈 중 오류가 발생했습니다.";
        alert(errorMessage);
      }
    }
  };
  return (
    <div className={style.wrapper}>
      <h2>CONDITION CAPSULE</h2>
      <div className={style.contentBox}>
        <div ref={scrollRef} className={style.capsuleList}>
          {capsuleCndt?.map((items) => {
            const isLocked = !items.capOpen;
            return (
              <div className={`${style.capsuleBox} ${isLocked ? style.lock : ""}`} key={items.capId} onClick={() => clickEvent(isLocked, items.capId)}>
                {isLocked && (
                  <div className={style.screen}>
                    <img src={lock} alt='잠김' />
                  </div>
                )}
                {/* 캡슐의 아이디와 로그인한 아이디가 같으면 캡슐 열기 버튼생성 */}
                {isLocked && userInfo?.memberId === items.memberId && (
                  <button
                    className={style.capsuleOpenButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCapusleOpen(items.capId, items.capCndtCase);
                    }}
                  >
                    캡슐 열기
                  </button>
                )}

                <h4>{items.capText}</h4>
                <div className={style.capsuleContent}>
                  <div className={style.imgBox}>
                    <img src={items.capImg ?? mini_logo} alt='조건 사진' />
                  </div>
                  <span>{items.capEt.substring(0, 10).replaceAll("-", ".")}</span>
                  <span>{items.memberNickname}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div ref={progressBarRef} onClick={handleProgressClick} onMouseDown={handleMouseDown} className={style.progressWrapper}>
        <ProgressBar scrollProgress={scrollProgress} />
      </div>
      <CapsuleOpenConfirm isOpen={showCapsuleModal} onClose={handleCapsuleOpenCancel} onConfirm={handleCapsuleOpen} title='캡슐을 열겠습니까?' isOpening={isOpening} cndt={selectedCndt} />
    </div>
  );
};

export default ConditionCapsule;

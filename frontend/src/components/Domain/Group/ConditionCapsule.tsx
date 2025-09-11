import style from "../../../styles/ConditionCapsule.module.scss";
import type { CapsuleCndtListDto } from "../../../types/capsule";

import { lock, mini_logo } from "../../../assets";
import ProgressBar from "./ProgressBar";
import useProgress from "../../../hooks/useProgress";
import { useNavigate } from "react-router-dom";

interface ConditionCapsuleProps {
  capsuleCndt: CapsuleCndtListDto[] | undefined;
}

const ConditionCapsule = ({ capsuleCndt }: ConditionCapsuleProps) => {
  const { scrollRef, scrollProgress, progressBarRef, handleProgressClick, handleMouseDown } = useProgress();
  const navigate = useNavigate();
  const clickEvent = (isLocked: boolean, capId: number) => {
      if (!isLocked) {
          navigate(`/detail/${capId}`);
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
                    <div className={style.capsuleBox} key={items.capId} onClick={() => clickEvent(isLocked, items.capId)}>
                        {isLocked && (
                            <div className={style.screen}>
                                <img src={lock} alt="잠김" />
                            </div>
                        )}

                        <h4>{items.capCndtCase}</h4>
                        <div className={style.capsuleContent}>
                            <div className={style.imgBox}>
                                <img src={items.capImg ?? mini_logo} alt="조건 사진" />
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
    </div>
  );
};

export default ConditionCapsule;

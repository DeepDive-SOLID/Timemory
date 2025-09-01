import style from "../../../styles/ConditionCapsule.module.scss";
import type { CapsuleCndtListDto } from "../../../types/capsule";

import { mini_logo } from "../../../assets";
import ProgressBar from "./ProgressBar";
import useProgress from "../../../hooks/useProgress";
import { useNavigate } from "react-router-dom";

interface ConditionCapsuleProps {
  capsuleCndt: CapsuleCndtListDto[] | undefined;
}

const ConditionCapsule = ({ capsuleCndt }: ConditionCapsuleProps) => {
  const { scrollRef, scrollProgress } = useProgress();
  const navigate = useNavigate();
  const clickEvent = () => {
    // 상세창 만들면 연동
    navigate("/home");
  };
  return (
    <div className={style.wrapper}>
      <h2>CONDITION CAPSULE</h2>
      <div ref={scrollRef} className={style.capsuleList}>
        {capsuleCndt?.map((items) => (
          <div className={style.capsuleBox} key={items.capId} onClick={() => clickEvent()}>
            <h4>{items.capText}</h4>
            <div className={style.capsuleContent}>
              <img src={items.capImg ? items.capImg : mini_logo} alt='조건 사진' />
              <span>{items.capEt}</span>
              <span>{items.memberId}</span>
            </div>
          </div>
        ))}
      </div>
      <ProgressBar scrollProgress={scrollProgress} />
    </div>
  );
};

export default ConditionCapsule;

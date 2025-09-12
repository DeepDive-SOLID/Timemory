import { useEffect, useState } from "react";
import "../../../styles/CapsuleAnimation.modile.scss";
import { capsule_top, capsule_bottom } from "../../../assets/index";
import { useNavigate } from "react-router-dom";
import type { CapsuleDateOpenDto, CapsuleLtOpenDto } from "../../../types/openCapsule";

interface CapsuleAnimationProps {
  data: CapsuleDateOpenDto | CapsuleLtOpenDto;
}
const CapsuleAnimation = ({ data }: CapsuleAnimationProps) => {
  const [animationState, setAnimationState] = useState("closed"); // 'closed', 'opening', 'open'

  const navigate = useNavigate();

  useEffect(() => {
    if (animationState !== "closed") return;

    const timer = requestAnimationFrame(() => setAnimationState("opening"));
    // 캡슐이 완전히 열린 후 2초 뒤에 페이지 이동
    setTimeout(() => {
      // requestAnimationFrame을 써서 렌더링 한 프레임 뒤에 상태 변경

      setAnimationState("open");
      // 페이지 이동 (1초 후)
      setTimeout(() => {
        navigate(`/detail/${data.capId}`);
      }, 2000);
    }, 1000);
    return () => cancelAnimationFrame(timer);
  }, [animationState, navigate, data]);

  // if (!data) return null;
  return (
    <div className='capsule-container'>
      <div className='capsule-content'>
        {/* 애니메이션 컨테이너 */}
        <div className='animation-container'>
          {/* 배경 글로우 효과 - 파란색에서 노란색으로 변화 */}
          <div className={`glow-effect ${animationState}`} />

          {/* 추가 노란색 빛 효과 (열릴 때만) */}
          <div className={`yellow-glow ${animationState}`} />

          {/* 캡슐 하단부 이미지 */}
          {/* 이미지 자르면 여기 넣기 */}
          <div className={`capsule-bottom ${animationState}`}>
            <img src={capsule_bottom} alt='캡슐 하단부' className='capsule-image' />
          </div>

          {/* 캡슐 상단부 이미지 */}
          {/* 이미지 자르면 여기 넣기 */}
          <div className={`capsule-top ${animationState}`}>
            <img src={capsule_top} alt='캡슐 상단부' className='capsule-image' />
          </div>

          {/* 캡슐 내용물 (작은 알약들) */}
          <div className={`capsule-contents ${animationState}`}>
            <div className='pill pink' />
            <div className='pill yellow' />
            <div className='pill green' />
            <div className='pill purple' />
          </div>
        </div>

        {/* 상태 메시지 */}
        <div className='status-message'>
          {animationState === "opening" && <p className='message opening'>캡슐이 열리고 있어요...</p>}
          {animationState === "open" && <p className='message open'>캡슐 상세 페이지로 이동중...</p>}
        </div>
      </div>
    </div>
  );
};

export default CapsuleAnimation;

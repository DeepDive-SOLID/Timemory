import style from "../../../styles/DateCapsule.module.scss";
import type { CapsuleDateListDto } from "../../../types/capsule";
import { lock } from "../../../assets";
import ProgressBar from "./ProgressBar";
import useProgress from "../../../hooks/useProgress";
import { useNavigate } from "react-router-dom";
interface DateCapsuleProps {
  capsuleDate: CapsuleDateListDto[] | undefined;
}
const DateCapsule = ({ capsuleDate }: DateCapsuleProps) => {
  // 프로그래스바에 대한 커스텀 훅
  const { scrollRef, scrollProgress } = useProgress();
  const navigate = useNavigate();
  // 받아온 배열을 정렬해 새로운 변수에 저장
  const sortCapsuleDate = capsuleDate?.sort((a, b) => new Date(a.capEt).getTime() - new Date(b.capEt).getTime());

  const getRemainingDays = (endDateStr: string) => {
    const today = new Date();
    const endDate = new Date(endDateStr);

    // 날짜의 시, 분, 초를 0으로 초기화하여 정확한 일수 차이 계산
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // 두 날짜의 차이(밀리초) 계산
    const timeDifference = endDate.getTime() - today.getTime();

    // 밀리초를 일수로 변환
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const clickEvent = () => {
    // 세부창 만들면 연동
    navigate("/");
  };

  return (
    <div className={style.wrapper}>
      <h2>DATE CAPSULE</h2>
      <div ref={scrollRef} className={style.capsuleList}>
        {sortCapsuleDate?.map((items) => {
          const dDay = getRemainingDays(items.capEt);
          return (
            <div className={style.capsuleBox} onClick={() => clickEvent()}>
              {dDay > 0 && (
                <div className={style.screen}>
                  <img src={lock} alt='잠김' />
                  {"D-" + dDay}
                </div>
              )}
              <h4>{items.capText}</h4>
              <div className={style.capsuleContent}>
                <span>{items.capEt.substring(0, 10)}</span>
                <span>{items.memberNickname}</span>
              </div>
            </div>
          );
        })}
      </div>
      <ProgressBar scrollProgress={scrollProgress} />
    </div>
  );
};

export default DateCapsule;

import QuizBox from "../components/UI/QuizBox";
import styles from "../styles/Quiz.module.scss";
import { cloud_img, hashtag_img, condition_img, camera_img } from "../assets";
import InputBox from "../components/UI/InputBox";
import StatusBar from "../components/APP/StatusBar";
import { useState } from "react";

const quizData = [
  {
    title: (
      <>
        <span className={styles.QuizTitleStrong}>어떤 순간</span>을 <br />
        담고 싶으신가요?
      </>
    ),
    image: cloud_img,
    input: "순간을 기억하며 작성해주세요.",
    warning: "자동으로 AI 검열해줘요 !",
    svgBox: "lg" as const,
    button: "다음 질문",
  },
  {
    title: (
      <>
        그 날을 떠올릴 수 있는 <br />
        <span className={styles.QuizTitleStrong}>키워드</span> 를 작성해주세요 !
      </>
    ),
    image: hashtag_img,
    input: "키워드를 입력해주세요.",
    warning: "20자 이내로 작성해주세요. ",
    svgBox: "sm" as const,
    button: "다음 질문",
  },
  {
    title: (
      <>
        그 <span className={styles.QuizTitleStrong}>순간을 담은 사진</span>이
        <br />
        있다면 함께 올려주세요 !
      </>
    ),
    image: camera_img,
    warning: "사진을 추가해주세요.",
    svgBox: "file" as const,
    button: "다음 질문",
  },
  {
    title: (
      <>
        <span className={styles.QuizTitleStrong}>어떤 이유</span> 로<br />
        담고 싶으신가요?
      </>
    ),
    image: condition_img,
    input: "이유를 입력해주세요.",
    warning: "아직 답변을 작성하지 않았어요!",
    svgBox: "lg" as const,
    button: "다음 질문",
  },
];

const Quiz = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < quizData.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("퀴즈 완료!");
      // 여기서 제출 로직 or 다음 페이지 이동
    }
  };

  const current = quizData[step];

  return (
    <div>
      <StatusBar to={"/home"} />
      <QuizBox
        title={current.title}
        image={current.image}
        answer={
          <InputBox
            input={current.input}
            warning={current.warning}
            svgBox={current.svgBox}
          />
        }
        button={step < quizData.length - 1 ? "다음 질문" : "완료"}
        onClick={handleNext}
      />
    </div>
  );
};

export default Quiz;

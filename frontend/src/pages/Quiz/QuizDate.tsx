import QuizBox from "../../components/UI/QuizBox";
import styles from "../../styles/Quiz.module.scss";
import { cloud_img, hashtag_img, camera_img } from "../../assets";
import InputBox from "../../components/UI/InputBox";
import StatusBar from "../../components/APP/StatusBar";
import { useState } from "react";
import Calendar from "../../components/UI/Calendar";

const quizData = [
  {
    type: "date" as const,
    title: (
      <>
        <span className={styles.QuizTitleStrong}>기억하고 싶은 날</span>을{" "}
        <br />
        골라주세요
      </>
    ),
    warning: "날짜를 선택해주세요.",
    svgBox: "sm" as const,
  },
  {
    type: "text" as const,
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
  },
  {
    type: "keyword" as const,
    title: (
      <>
        그 날을 떠올릴 수 있는 <br />
        <span className={styles.QuizTitleStrong}>키워드</span>를 작성해주세요 !
      </>
    ),
    image: hashtag_img,
    input: "키워드를 입력해주세요.",
    warning: "20자 이내로 작성해주세요.",
    svgBox: "sm" as const,
  },
  {
    type: "file" as const,
    title: (
      <>
        그 <span className={styles.QuizTitleStrong}>순간을 담은 사진</span>이
        <br />
        있다면 함께 올려주세요 !
      </>
    ),
    image: camera_img,
    warning: "사진을 추가해주세요.",
  },
];

const QuizDate = () => {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const addTag = (t: string) => setTags((prev) => [...prev, t]);

  const current = quizData[step];

  const formatMD = (d: Date | null) =>
    d ? `${d.getMonth() + 1}/${d.getDate()}` : "";

  const handleNext = () => {
    if (step < quizData.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("퀴즈 완료!");
      // 제출 로직 or 다음 페이지 이동
    }
  };

  return (
    <div>
      <StatusBar to={"/home"} />
      <QuizBox
        title={current.title}
        image={current.image}
        answer={
          current.type === "date" ? (
            <>
              <Calendar
                value={selectedDate ?? undefined}
                onChange={setSelectedDate}
              />
              <InputBox
                type="date"
                warning={current.warning}
                svgBox={current.svgBox}
                displayValue={formatMD(selectedDate)}
                displayPlaceholder="날짜를 선택하세요"
                required
              />
            </>
          ) : current.type === "keyword" ? (
            <InputBox
              type="keyword"
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              required
              value={tagText}
              onChangeText={setTagText}
              tags={tags}
              onAddTag={addTag}
              maxTagLen={20}
            />
          ) : (
            <InputBox
              type={current.type}
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              required
            />
          )
        }
        button={step < quizData.length - 1 ? "다음 질문" : "제출하기"}
        onClick={handleNext}
      />
    </div>
  );
};

export default QuizDate;

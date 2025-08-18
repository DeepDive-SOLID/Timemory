import QuizBox from "../../components/UI/QuizBox";
import styles from "../../styles/Quiz.module.scss";
import { cloud_img, hashtag_img, map_img, camera_img } from "../../assets";
import InputBox from "../../components/UI/InputBox";
import StatusBar from "../../components/APP/StatusBar";
import { useState } from "react";

const quizData = [
  {
    type: "text" as const,
    title: (
      <>
        추억이 만들어진 <br />
        <span className={styles.QuizTitleStrong}>장소</span> 를 알려주세요 !
      </>
    ),
    image: map_img,
    input: "",
    warning: "위치 찾기를 통해 쉽고 간편하게 주소를 입력해보세요!",
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
        <span className={styles.QuizTitleStrong}>키워드</span> 를 작성해주세요 !
      </>
    ),
    image: hashtag_img,
    input: "키워드를 입력해주세요.",
    warning: "20자 이내로 작성해주세요. ",
    svgBox: "sm" as const,
    maxTagLen: 20,
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

const QuizLocation = () => {
  const [step, setStep] = useState(0);

  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");

  const addTag = (t: string) => setTags((prev) => [...prev, t]);

  const current = quizData[step];

  const handleFindLocation = () => {
    // TODO: 실제 지도/주소 검색 연동
    setAddress("경기 성남시 분당구 판교역로 166 카카오");
  };

  const handleNext = () => {
    if (step === 0 && address.trim() === "") return;

    if (step < quizData.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("퀴즈 완료!");
    }
  };

  return (
    <div>
      <StatusBar to={"/home"} />
      <QuizBox
        title={current.title}
        image={current.image}
        answer={
          step === 0 ? (
            <>
              <button className={styles.findBtn} onClick={handleFindLocation}>
                위치 찾기
              </button>

              <InputBox
                type="text"
                label="주소"
                svgBox="sm"
                value={address}
                onChangeText={setAddress}
                input={current.input}
                warning={current.warning}
                required
              />

              <InputBox
                type="text"
                label="상세 주소"
                svgBox="sm"
                value={detail}
                onChangeText={setDetail}
                input="상세 주소를 입력해주세요."
              />
            </>
          ) : current.type === "keyword" ? (
            <InputBox
              type="keyword"
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              tags={tags}
              value={tagText}
              onChangeText={setTagText}
              onAddTag={addTag}
              maxTagLen={current.maxTagLen}
              required
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

export default QuizLocation;

import QuizBox from "../../components/UI/QuizBox";
import styles from "../../styles/Quiz.module.scss";
import { cloud_img, hashtag_img, camera_img } from "../../assets";
import InputBox from "../../components/UI/InputBox";
import StatusBar from "../../components/APP/StatusBar";
import { useState } from "react";
import Calendar from "../../components/UI/Calendar";
import type { CapsuleDateDto } from "../../types/capsule";
import { CapsuleDateCreateApi } from "../../api/CapsuleApi";
import { toLocalDateTimeString, formatMD } from "../../utils/datetime";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const quizData = [
  {
    type: "date" as const,
    title: (
      <>
        <span className={styles.QuizTitleStrong}>기억하고 싶은 날</span>을 <br />
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
    warning: "기억을 작성해주세요.",
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
    warning: "20자 이내로 엔터를 눌러 작성해주세요.",
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
  const [momentText, setMomentText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [forceWarnStep, setForceWarnStep] = useState<number | null>(null);
  const navigate = useNavigate();

  const addTag = (t: string) => setTags((prev) => [...prev, t]);
  const current = quizData[step];

  const { userInfo } = useContext(AuthContext)!;
  const memberId = userInfo?.memberId ?? "";
  const { teamId } = useParams<{ teamId: string }>();

  const validateCurrent = () => {
    if (step === 0 && !selectedDate) return "날짜를 선택해주세요.";
    if (step === 1 && !momentText.trim()) return "기억을 입력해주세요.";
    if (step === 2 && tags.length === 0) return "키워드를 한 개 이상 추가해주세요.";
    return null;
  };

  const handleNext = async () => {
    if (step < quizData.length - 1) {
      const msg = validateCurrent();
      if (msg) {
        setForceWarnStep(step);
        return;
      }
      setForceWarnStep(null);
      setStep((prev) => prev + 1);
      return;
    }

    try {
      if (!selectedDate) {
        alert("날짜를 선택해주세요.");
        return;
      }

      const dto: CapsuleDateDto = {
        teamId: Number(teamId),
        memberId: memberId ?? "",
        capText: momentText.trim(),
        capEt: toLocalDateTimeString(selectedDate),
        capImg: file as File,
        capTag: tags.join(","),
      };
      const res = await CapsuleDateCreateApi(dto);
      alert("날짜 캡슐 생성 성공: " + res);
      navigate("/group/" + teamId);
    } catch (e) {
      console.error(e);
      alert("날짜 캡슐 생성 실패");
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
              <Calendar value={selectedDate ?? undefined} onChange={setSelectedDate} />
              <InputBox
                type='date'
                warning={current.warning}
                svgBox={current.svgBox}
                displayValue={formatMD(selectedDate)}
                displayPlaceholder='날짜를 선택하세요'
                required
                forceShowWarning={forceWarnStep === step}
              />
            </>
          ) : current.type === "keyword" ? (
            <InputBox
              type='keyword'
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              required
              value={tagText}
              onChangeText={setTagText}
              tags={tags}
              onAddTag={(t) => {
                addTag(t);
                setTagText("");
              }}
              maxTagLen={20}
              forceShowWarning={forceWarnStep === step}
            />
          ) : current.type === "file" ? (
            <InputBox type='file' warning={current.warning} onFileChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          ) : (
            <InputBox
              type='text'
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              required
              value={momentText}
              onChangeText={setMomentText}
              forceShowWarning={forceWarnStep === step}
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

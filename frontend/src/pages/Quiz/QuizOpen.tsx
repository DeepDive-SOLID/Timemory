import QuizBox from "../../components/UI/QuizBox";
import styles from "../../styles/Quiz.module.scss";
import { cloud_img, hashtag_img, camera_img } from "../../assets";
import InputBox from "../../components/UI/InputBox";
import StatusBar from "../../components/APP/StatusBar";
import { useState } from "react";
import type { OpenCapsuleAddDto } from "../../types/openlist";
import { addOpenCapsuleDto } from "../../api/openlistApi";
import { toLocalDateTimeString } from "../../utils/datetime";
import { events } from "../../constants/events";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const QuizOpen = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventData = events.find((e) => e.id === eventId) || events[0];
  const { userInfo } = useContext(AuthContext)!;
  const memberId = userInfo?.memberId ?? "";

  const location = useLocation() as { state?: { teamId?: number } };
  const teamId = location.state?.teamId;
  const navigate = useNavigate();

  const quizData = [
    {
      type: "text" as const,
      title: (
        <>
          {eventData.quiz && (
            <>
              <span className={styles.QuizTitleStrong2}>{eventData.quiz}</span>
              <br />
            </>
          )}
          어떤 순간을 담고 싶으신가요?
        </>
      ),

      image: eventData.image2 ?? cloud_img,
      input: "순간을 기억하며 작성해주세요.",
      warning: "자동으로 AI 검열해줘요 !",
      svgBox: "lg" as const,
    },
    {
      type: "keyword" as const,
      title: (
        <>
          그 날을 떠올릴 수 있는 <br />
          <span className={styles.QuizTitleStrong}>키워드</span> 를 작성해주세요
          !
        </>
      ),
      image: hashtag_img,
      input: "키워드를 입력해주세요.",
      warning: "20자 이내로 엔터를 눌러 작성해주세요.",
      svgBox: "sm" as const,
      maxTagLen: 20,
      required: false,
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

  const [step, setStep] = useState(0);
  const [momentText, setMomentText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [forceWarnStep, setForceWarnStep] = useState<number | null>(null);
  const [isAiBlocked, setIsAiBlocked] = useState(false);

  const addTag = (t: string) => setTags((prev) => [...prev, t]);

  const current = quizData[step];

  const validateCurrent = () => {
    if (step === 0 && !momentText.trim()) return "기억을 입력해주세요.";
    if (step === 1 && tags.length === 0)
      return "키워드를 한 개 이상 추가해주세요.";
    if (step === 2 && !file) {
      return "사진을 추가해주세요.";
    }
    return null;
  };

  const handleNext = async () => {
    if (step < quizData.length - 1) {
      if (isAiBlocked) {
        alert("금지된 내용이 포함되어 있습니다. 수정 후 진행해주세요.");
        return;
      }

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
      if (!teamId) {
        alert("팀 정보가 없습니다. 홈에서 다시 시도해주세요.");
        return;
      }

      const dto: OpenCapsuleAddDto = {
        teamId,
        memberId: memberId ?? "",
        capText: momentText.trim(),
        capEt: toLocalDateTimeString(new Date(eventData.annDt)),
        capUt: toLocalDateTimeString(new Date()),
        capImg: file as File,
        capTag: tags.join(","),
      };

      const res = await addOpenCapsuleDto(dto);
      alert("캡슐 생성 성공: " + res);
      navigate(`/openlist/${eventId}`, { state: { teamId } });
    } catch (err) {
      alert("캡슐 생성 실패");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <StatusBar to={"/group"} />
      <QuizBox
        title={current.title}
        image={current.image}
        answer={
          current.type === "keyword" ? (
            <InputBox
              type="keyword"
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              required
              tags={tags}
              value={tagText}
              onChangeText={setTagText}
              onAddTag={(t) => {
                addTag(t);
                setTagText("");
              }}
              maxTagLen={20}
              forceShowWarning={forceWarnStep === step}
            />
          ) : current.type === "file" ? (
            <InputBox
              type="file"
              warning={current.warning}
              onFileChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          ) : (
            <InputBox
              type="text"
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              required
              value={momentText}
              onChangeText={setMomentText}
              forceShowWarning={forceWarnStep === step}
              onAiCheck={setIsAiBlocked}
            />
          )
        }
        button={step < quizData.length - 1 ? "다음 질문" : "제출하기"}
        onClick={handleNext}
      />
    </div>
  );
};

export default QuizOpen;

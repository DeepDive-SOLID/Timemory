import QuizBox from "../../components/UI/QuizBox";
import styles from "../../styles/Quiz.module.scss";
import { cloud_img, hashtag_img, map_img, camera_img } from "../../assets";
import InputBox from "../../components/UI/InputBox";
import StatusBar from "../../components/APP/StatusBar";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import type { LtAddDto } from "../../types/map";
import { AuthContext } from "../../contexts/AuthContext";
import { saveLtApi } from "../../api/MapApi";
import { toLocalDateTimeString } from "../../utils/datetime";

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
    warning: "20자 이내로 엔터를 눌러 작성해주세요.",
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

  const [detail, setDetail] = useState("");
  const [momentText, setMomentText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [forceWarnStep, setForceWarnStep] = useState<number | null>(null);
  const address = useAppSelector((state) => state.location.address_name);
  const addTag = (t: string) => setTags((prev) => [...prev, t]);

  const current = quizData[step];

  const { userInfo } = useContext(AuthContext)!;
  const memberId = userInfo?.memberId ?? "";
  const { teamId } = useParams<{ teamId: string }>();

  const navigate = useNavigate();

  const handleFindLocation = () => {
    // TODO: 실제 지도/주소 검색 연동
    navigate("/map");
  };

  const validateCurrent = () => {
    if (step === 0 && !address?.trim()) return "주소를 입력해주세요.";
    if (step === 1 && !momentText.trim()) return "기억을 작성해주세요.";
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

    // TODO: 제출 로직 추가
    try {
      if (!address) {
        alert("지도를 선택해주세요.");
        return;
      }
      const dto: LtAddDto = {
        teamId: Number(teamId),
        memberId: memberId,
        capText: momentText.trim(),
        capImg: file as File,
        capTag: tags.join(","),
        capUt: toLocalDateTimeString(new Date()),
        capLtAddr: address,
        capLtDetail: detail,
      };
      const res = await saveLtApi(dto);
      alert("지도 캡슐 생성 성공: " + res);
      navigate("/group/" + teamId);
    } catch (e) {
      console.error(e);
      alert("지도 캡슐 생성 실패");
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

              <InputBox type='text' label='주소' svgBox='sm' value={address} input={current.input} warning={current.warning} required forceShowWarning={forceWarnStep === step} />

              <InputBox type='text' label='상세 주소' svgBox='sm' value={detail} onChangeText={setDetail} input='상세 주소를 입력해주세요.' />
            </>
          ) : current.type === "keyword" ? (
            <InputBox
              type='keyword'
              input={current.input}
              warning={current.warning}
              svgBox={current.svgBox}
              tags={tags}
              value={tagText}
              onChangeText={setTagText}
              onAddTag={(t) => {
                addTag(t);
                setTagText("");
              }}
              maxTagLen={20}
              required
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

export default QuizLocation;

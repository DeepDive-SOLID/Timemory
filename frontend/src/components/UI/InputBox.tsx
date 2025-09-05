import { useState } from "react";
import styles from "../../styles/InputBox.module.scss";
import { inputbox_lg, inputbox_sm } from "../../assets";
import TagAnimation from "./TagAnimation";

export interface InputBoxProps {
  type: "text" | "file" | "keyword" | "date";
  svgBox?: "lg" | "sm";
  input?: string;
  warning?: string;
  label?: string;

  // 공통 입력 값
  value?: string;
  onChangeText?: (v: string) => void;

  // 파일 입력 전용
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // 달력 전용
  displayValue?: string;
  displayPlaceholder?: string;

  // 키워드 전용
  tags?: string[];
  onAddTag?: (tag: string) => void;
  maxTagLen?: number;

  // 검증용
  required?: boolean;
  forceShowWarning?: boolean;
  maxLength?: number;
}

const InputBox = ({
  type,
  svgBox = "lg",
  input,
  warning = "",
  label,
  value,
  onChangeText,
  onFileChange,
  displayValue,
  displayPlaceholder = "",
  tags,
  onAddTag,
  maxTagLen = 20,
  required = false,
  forceShowWarning = false,
  maxLength,
}: InputBoxProps) => {
  const [innerText, setInnerText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const src = svgBox === "sm" ? inputbox_sm : inputbox_lg;

  const currentText = value ?? innerText;
  const setCurrentText = (v: string): void => {
    if (onChangeText) onChangeText(v);
    else setInnerText(v);
  };

  // 유효성 체크
  const isEmpty = (): boolean => {
    switch (type) {
      case "file":
        return !file;
      case "date":
        return !displayValue?.trim();
      case "keyword":
        return (tags?.length ?? 0) === 0;
      case "text":
      default:
        return !currentText.trim();
    }
  };

  const shouldWarn = required && (touched || forceShowWarning) && isEmpty();
  const handleBlur = () => setTouched(true);

  // 파일 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setTouched(true);
    onFileChange?.(e);
  };

  // 키워드 엔터 처리
  const handleKeywordKeyDown: React.KeyboardEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    // 쉼표 입력 막기
    if (e.key === ",") {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const t = currentText.trim();
      if (!t || t.length > (maxTagLen ?? 20)) {
        setTouched(true);
        return;
      }
      onAddTag?.(t);
      setCurrentText("");
      setTouched(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {label && <p className={styles.inputLabel}>{label}</p>}

      {/* 키워드 태그 애니메이션 */}
      {type === "keyword" && (tags?.length ?? 0) > 0 && (
        <div className={styles.keywordMarqueeWrap}>
          <TagAnimation tags={tags!} rows={3} baseSpeedSec={18} />
        </div>
      )}

      {/* 파일 업로드 */}
      {type === "file" ? (
        <div className={styles.fileWrap}>
          <div className={styles.fileInfoBox}>
            <p>
              <strong>최대 첨부 파일 크기:</strong> 1MB
            </p>
            <p>
              <strong>허용 확장자:</strong> jpg, png
            </p>
            <p>
              <strong>파일명 길이 제한:</strong> 300자 이하
            </p>
          </div>

          <label htmlFor="imageInput" className={styles.fileButton}>
            {file ? file.name : "사진 추가"}
          </label>
          <input
            id="imageInput"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className={styles.fileInput}
            onBlur={handleBlur}
          />
        </div>
      ) : (
        <div className={styles.boxWrap}>
          <img src={src} alt="Input Box" className={styles.inputImage} />

          {/* 달력 */}
          {type === "date" ? (
            <div
              className={styles.valueOverlay}
              style={{
                color: displayValue ? "#ef6c5e" : "#b4b4b4",
                fontWeight: 600,
              }}
              onClick={() => setTouched(true)}
            >
              {displayValue || displayPlaceholder}
            </div>
          ) : (
            // 텍스트 / 키워드 공통
            <textarea
              className={styles.inputField}
              placeholder={input}
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={type === "keyword" ? handleKeywordKeyDown : undefined}
              maxLength={type === "keyword" ? maxTagLen : maxLength}
            />
          )}
        </div>
      )}

      {/* 경고 */}
      {shouldWarn && warning && (
        <div className={styles.warningMessage}>
          <p>{warning}</p>
        </div>
      )}
    </div>
  );
};

export default InputBox;

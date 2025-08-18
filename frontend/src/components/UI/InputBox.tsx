import { useState } from "react";
import styles from "../../styles/InputBox.module.scss";
import { inputbox_lg, inputbox_sm } from "../../assets";

export interface InputBoxProps {
  input?: string;
  warning: string;
  svgBox?: "lg" | "sm" | "file";
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  input,
  warning,
  svgBox = "lg",
  onFileChange,
}: InputBoxProps) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleBlur = () => {
    if (svgBox === "file") {
      setShowWarning(!file);
    } else {
      setShowWarning(text.trim() === "");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setShowWarning(!selected);
    onFileChange?.(e);
  };

  if (svgBox === "file") {
    return (
      <div className={styles.inputContainer}>
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
            사진 추가
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
        {showWarning && (
          <div className={styles.warningMessage}>
            <p>{warning}</p>
          </div>
        )}
      </div>
    );
  }

  const src = svgBox === "sm" ? inputbox_sm : inputbox_lg;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.boxWrap}>
        <img src={src} alt="Input Box" className={styles.inputImage} />
        <textarea
          className={styles.inputField}
          placeholder={input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
      {showWarning && (
        <div className={styles.warningMessage}>
          <p>{warning}</p>
        </div>
      )}
    </div>
  );
};

export default InputBox;

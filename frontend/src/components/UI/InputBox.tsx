import styles from "../../styles/InputBox.module.scss";
import { inputbox_lg, inputbox_sm } from "../../assets";

export interface InputBoxProps {
  input: string;
  warning: string;
  svgBox?: "lg" | "sm";
}

const InputBox = ({ input, warning, svgBox = "lg" }: InputBoxProps) => {
  const src = svgBox === "sm" ? inputbox_sm : inputbox_lg;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.boxWrap}>
        <img src={src} alt="Input Box" className={styles.inputImage} />
        <textarea className={styles.inputField} placeholder={input} />
      </div>
      <div className={styles.warningMessage}>
        <p>{warning}</p>
      </div>
    </div>
  );
};

export default InputBox;

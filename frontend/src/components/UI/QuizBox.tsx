import React from "react";
import styles from "../../styles/QuizBox.module.scss";

export interface QuizBoxProps {
  title: React.ReactNode; // 질문
  image: string; // 이미지 및 아이콘
  answer: React.ReactNode; // 답변 입력란
  button: string; // 제출버튼
}

const QuizBox = ({ title, image, answer, button }: QuizBoxProps) => {
  return (
    <div className={styles.QuizContainer}>
      <h2 className={styles.QuizTitle}>{title}</h2>
      <img src={image} alt="Quiz" className={styles.QuizImg} />
      <div className={styles.content}>{answer}</div>
      <div className={styles.QuizBtn}>{button}</div>
    </div>
  );
};

export default QuizBox;

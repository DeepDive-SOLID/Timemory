import React from "react";
import TabBar from "../components/APP/TabBar";
import CapsuleSlider from "../components/Domain/CapsuleSlider";
import styles from "../styles/MyCapsule.module.scss";
import { card_ex } from "../assets/index.ts";

const MyCapsule: React.FC = () => {
  const capsules = [
    {
      id: 1,
      title:
        "오늘 생일파티 즐거움 오늘 생일파티 즐거움 오늘 생일파티 즐거움 오늘 생일파티 즐거움 오늘 생일파티 즐거움 오늘 생일파티 즐거움",
      hashtags: [
        "#내 생일",
        "#생일파티",
        "#생일파티",
        "#생일파티",
        "#생일파티",
        "#생일파티",
      ],
      createdDate: "2025.08.06",
      expireDate: "2025.08.10",
      image: card_ex,
    },
    {
      id: 2,
      title: "여행 추억",
      hashtags: ["#여행", "#추억"],
      createdDate: "2025.07.15",
      expireDate: "2025.09.20",
      image: card_ex,
    },
    {
      id: 3,
      title: "친구들과 만남",
      hashtags: ["#친구", "#만남"],
      createdDate: "2025.08.01",
      expireDate: "2025.08.15",
      image: card_ex,
    },
    {
      id: 4,
      title: "새로운 시작",
      hashtags: ["#새시작", "#도전"],
      createdDate: "2025.07.20",
      expireDate: "2025.10.01",
      image: card_ex,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>MY CAPSULE</h1>
        <div className={styles.description}>
          <p>
            내가 작성한 <span className={styles.highlight}>타임캡슐</span>이에요
          </p>
          <p>
            <span className={styles.highlight}>추억</span>을 돌아보며
          </p>
          <p>
            <span className={styles.highlight}>곧 열릴 타임캡슐</span>도 함께
            기다려봐요!
          </p>
        </div>
      </div>

      <CapsuleSlider capsules={capsules} />

      <TabBar />
    </div>
  );
};

export default MyCapsule;

import React from "react";
import TabBar from "../components/APP/TabBar";
import CapsuleSlider from "../components/Domain/CapsuleSlider";
import MessageCardSection from "../components/Domain/MessageCard";
import LocationSection from "../components/Domain/LocationSection";
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

  const messageCards = [
    {
      id: 1,
      message: "사실 오늘 제 생일이었어요...",
      hashtags: ["#친구", "#만남"],
      author: "user1",
      createdDate: "2025.08.29",
      image: card_ex,
      condition: "눈 오는 날",
    },
    {
      id: 2,
      message:
        "오늘 정말 좋은 하루였어요!오늘 정말 좋은 하루였어요!오늘 정말 좋은 하루였어요!오늘 정말 좋은 하루였어요!오늘 정말 좋은 하루였어요!오늘 정말 좋은 하루였어요!",
      hashtags: ["#친구", "#만남"],
      author: "user2",
      createdDate: "2025.08.07",
      image: card_ex,
      condition: "눈 오는 날",
    },
    {
      id: 3,
      message: "새로운 도전을 시작했어요",
      hashtags: ["#친구", "#만남"],
      author: "user3",
      createdDate: "2025.08.06",
      image: card_ex,
      condition: "눈 오는 날",
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
            곧 <span className={styles.highlight}>열릴 타임캡슐</span>도 함께
            기다려봐요!
          </p>
        </div>
      </div>

      <CapsuleSlider capsules={capsules} />

      <MessageCardSection cards={messageCards} />

      <LocationSection />

      <TabBar />
    </div>
  );
};

export default MyCapsule;

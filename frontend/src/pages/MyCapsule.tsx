import React, { useState, useEffect } from "react";
import TabBar from "../components/APP/TabBar";
import CapsuleSlider from "../components/Domain/CapsuleSlider";
import MessageCardSection from "../components/Domain/MessageCard";
import LocationSection from "../components/Domain/LocationSection";
import styles from "../styles/MyCapsule.module.scss";
import type { Capsule } from "../types/capsule";
import { getUserCapsulesApi } from "../api/MyCapsuleApi";

// DATE 타입 캡슐만 필터링하는 헬퍼 함수
const filterDateCapsules = (capsules: Capsule[]): Capsule[] => {
  return capsules.filter((capsule) => capsule.capsuleType === "DATE");
};

// CONDITION 타입 캡슐만 필터링하는 헬퍼 함수
const filterConditionCapsules = (capsules: Capsule[]): Capsule[] => {
  return capsules.filter((capsule) => capsule.capsuleType === "CONDITION");
};

const MyCapsule: React.FC = () => {
  const [dateCapsules, setDateCapsules] = useState<Capsule[]>([]);
  const [conditionCapsules, setConditionCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [memberNickname, setMemberNickname] = useState<string>("");

  // 캡슐 목록을 불러오는 함수
  const fetchCapsules = async () => {
    try {
      setLoading(true);
      const response = await getUserCapsulesApi();
      setMemberNickname(response.memberNickname);
      const filteredDateCapsules = filterDateCapsules(response.capsules);
      const filteredConditionCapsules = filterConditionCapsules(
        response.capsules
      );

      // DATE 타입 캡슐들을 열림일자 가까운 순으로 정렬
      const sortedDateCapsules = filteredDateCapsules.sort((a, b) => {
        const dateA = new Date(a.openDate).getTime();
        const dateB = new Date(b.openDate).getTime();
        return dateA - dateB; // 오름차순 (가까운 순)
      });

      // CONDITION 타입 캡슐 정렬: (1) 열린 캡슐 먼저, (2) 최신 작성일 내림차순
      const sortedConditionCapsules = filteredConditionCapsules.sort((a, b) => {
        if (a.isOpened !== b.isOpened) {
          return a.isOpened ? -1 : 1;
        }
        const aCreated = new Date(a.createdAt).getTime();
        const bCreated = new Date(b.createdAt).getTime();
        return aCreated - bCreated; // 오름차순
      });

      setDateCapsules(sortedDateCapsules);
      setConditionCapsules(sortedConditionCapsules);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "캡슐을 불러오는 중 오류가 발생했습니다."
      );
      console.error("캡슐 조회 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  // CONDITION 타입 캡슐을 MessageCard 형태로 변환하는 함수
  const convertConditionCapsulesToMessageCards = (capsules: Capsule[]) => {
    return capsules.map((capsule) => {
      // 태그를 쉼표로 분리하고 #을 붙여서 hashtags 배열 생성
      const hashtags = capsule.tag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .map((tag) => `#${tag}`);

      return {
        id: capsule.capsuleId,
        message: capsule.content,
        hashtags: hashtags,
        author: memberNickname,
        createdDate: new Date(capsule.createdAt).toLocaleDateString("ko-KR"),
        image: capsule.imageUrl || "",
        isOpened: capsule.isOpened,
      };
    });
  };

  const messageCards =
    convertConditionCapsulesToMessageCards(conditionCapsules);

  // 캡슐 삭제 핸들러
  const handleCapsuleDeleted = () => {
    // 삭제 완료 후 전체 캡슐 목록을 새로고침
    fetchCapsules();
  };

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

      {loading ? (
        <div className={styles.loadingContainer}>
          <p>캡슐을 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>오류: {error}</p>
        </div>
      ) : (
        <>
          {dateCapsules.length > 0 && (
            <CapsuleSlider
              capsules={dateCapsules}
              onCapsuleDeleted={handleCapsuleDeleted}
            />
          )}
        </>
      )}

      <MessageCardSection
        cards={messageCards}
        onCapsuleDeleted={handleCapsuleDeleted}
      />

      <LocationSection />

      <TabBar />
    </div>
  );
};

export default MyCapsule;

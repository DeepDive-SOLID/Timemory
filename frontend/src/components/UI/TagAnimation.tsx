import React from "react";
import styles from "../../styles/TagAnimation.module.scss";

export interface TagAnimationProps {
  tags: string[];
  rows?: number; // 줄 수 (기본 3줄)
  baseSpeedSec?: number; // 첫 줄 속도(초) - 아래 줄들은 조금씩 다르게
}

const TagAnimation = ({
  tags,
  rows = 3,
  baseSpeedSec = 18,
}: TagAnimationProps) => {
  // 줄 수만큼 트랙 생성 (방향/속도 조금씩 다르게)
  const lines = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className={styles.marquee}>
      {lines.map((i) => (
        <div
          key={i}
          className={`${styles.track} ${i % 2 ? styles.reverse : ""}`}
          style={
            {
              "--dur": `${baseSpeedSec + i * 2}s`,
            } as React.CSSProperties & Record<string, string>
          }
        >
          <div className={styles.content}>
            {/* 원본 + 복제 = 무한루프 */}
            {tags.map((t, idx) => (
              <span
                className={`${styles.chip} ${
                  idx === tags.length - 1 ? styles.pop : ""
                }`}
                key={`a-${i}-${idx}-${t}`}
              >
                # {t}
              </span>
            ))}
            {tags.map((t, idx) => (
              <span className={styles.chip} key={`b-${i}-${idx}-${t}`}>
                # {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagAnimation;

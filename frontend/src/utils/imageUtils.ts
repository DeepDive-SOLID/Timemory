import { useState } from "react";

/**
 * 프로필 이미지 URL 검증 및 수정
 * 백엔드에서 잘못 구성된 URL을 올바른 형태로 변환
 */
export const getValidProfileImageUrl = (url: string): string | null => {
  if (!url) return null;

  // 잘못된 URL 패턴 감지 (localhost:8080/solidhttp://...)
  if (url.includes("localhost:8080/solidhttp://")) {
    // 카카오 프로필 이미지 URL 추출
    const kakaoUrlMatch = url.match(/solidhttp:\/\/(.+)/);
    if (kakaoUrlMatch) {
      return `http://${kakaoUrlMatch[1]}`;
    }
  }

  // 일반적인 외부 URL인 경우
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // 로컬 파일 URL인 경우
  if (url.startsWith("/")) {
    return `http://localhost:8080/solid${url}`;
  }

  return null;
};

/**
 * 이미지 로딩 에러 처리를 위한 커스텀 훅
 */
export const useImageErrorHandler = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const resetImageErrors = () => {
    setImageErrors({});
  };

  return {
    imageErrors,
    handleImageError,
    resetImageErrors,
  };
};

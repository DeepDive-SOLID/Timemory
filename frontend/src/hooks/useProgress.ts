import { useEffect, useRef, useState } from "react";

const useProgress = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = Math.max(scrollWidth - clientWidth, 1); // 0 방지
      const progress = Math.min(Math.max((scrollLeft / maxScroll) * 100, 0), 100);

      setScrollProgress(progress);
    };

    const el = scrollRef.current;
    if (!el) return;

    // 스크롤 이벤트 등록
    el.addEventListener("scroll", handleScroll);

    // 초기값 계산
    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollRef, scrollProgress };
};

export default useProgress;

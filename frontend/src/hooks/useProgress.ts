import { useEffect, useRef, useState } from "react";

const useProgress = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = Math.max(scrollWidth - clientWidth, 1);
      const progress = Math.min(Math.max((scrollLeft / maxScroll) * 100, 0), 100);
      setScrollProgress(progress);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // ✅ 스크롤 이동 함수
  const moveTo = (clientX: number) => {
    const bar = progressBarRef.current;
    const el = scrollRef.current;
    if (!bar || !el) return;

    const rect = bar.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);

    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: ratio * maxScroll, behavior: "auto" }); // 드래그 중은 즉시 이동
  };

  // ✅ 클릭으로 이동
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    moveTo(e.clientX);
  };

  // ✅ 드래그 시작
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    moveTo(e.clientX);
  };

  // ✅ 드래그 이벤트 등록
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      moveTo(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { scrollRef, scrollProgress, progressBarRef, handleProgressClick, handleMouseDown };
};

export default useProgress;

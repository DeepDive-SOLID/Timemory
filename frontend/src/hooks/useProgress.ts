import { useEffect, useRef, useState } from "react";

const useProgress = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);

    return () => {
      el?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { scrollRef, scrollProgress };
};

export default useProgress;

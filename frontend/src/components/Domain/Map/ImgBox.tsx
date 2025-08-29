import { useNavigate } from "react-router-dom";

interface ImgProps {
  img: string;
  className: string;
  url: string;
  alt: string;
}

const ImgBox = ({ img, className, url, alt }: ImgProps) => {
  const navigate = useNavigate();

  const clickEvent = () => {
    // 프론트 연동 시 변경
    navigate(`/${url}`);
  };
  return (
    <div className={className} onClick={() => clickEvent()}>
      <img src={img} alt={alt} />
    </div>
  );
};

export default ImgBox;

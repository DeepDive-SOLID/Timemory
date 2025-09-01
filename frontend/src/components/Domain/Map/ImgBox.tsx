import { useNavigate } from "react-router-dom";

interface ImgProps {
  img: string;
  className: string;
  url?: string;
  alt: string;
  groupId?: string;
}

const ImgBox = ({ img, className, url, alt, groupId }: ImgProps) => {
  const navigate = useNavigate();

  const clickEvent = () => {
    if (!url) return;
    // 프론트 연동 시 변경
    navigate(`/${url}/${groupId}`);
  };
  return (
    <div className={className} onClick={() => clickEvent()}>
      <img src={img} alt={alt} />
    </div>
  );
};

export default ImgBox;

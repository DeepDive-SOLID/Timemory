import { useNavigate } from "react-router-dom";

interface ImgProps {
  img: string;
  className: string;
  url?: string;
  alt: string;
  groupId?: string;
  capId?: number;
}

const ImgBox = ({ img, className, url, alt, groupId, capId }: ImgProps) => {
  const navigate = useNavigate();

  const clickEvent = () => {
    if (!url) return;
    navigate(`/${url}/${capId ? capId : groupId}`);
  };
  return (
    <div className={className} onClick={() => clickEvent()}>
      <img src={img} alt={alt} />
    </div>
  );
};

export default ImgBox;

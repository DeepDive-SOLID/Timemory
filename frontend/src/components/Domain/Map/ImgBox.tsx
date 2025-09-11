import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteCapsuleApi } from "../../../api/MyCapsuleApi";
import styles from "../../../styles/ImgBox.module.scss";

interface ImgProps {
  img: string;
  className: string;
  url?: string;
  alt: string;
  groupId?: string;
  capId?: number;
  showDeleteButton?: boolean;
}

const ImgBox = ({
  img,
  className,
  url,
  alt,
  groupId,
  capId,
  showDeleteButton = false,
}: ImgProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const clickEvent = () => {
    if (!url) return;
    navigate(`/${url}/${capId ? capId : groupId}`);
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!capId || isDeleting) return;

    const confirmed = window.confirm("이 캡슐을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteCapsuleApi(capId);
      alert("캡슐이 성공적으로 삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "캡슐 삭제 중 오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={className} onClick={() => clickEvent()}>
      <img src={img} alt={alt} />
      {showDeleteButton && capId && (
        <button
          className={styles.deleteButton}
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          <span className={styles.deleteIcon}>×</span>
        </button>
      )}
    </div>
  );
};

export default ImgBox;

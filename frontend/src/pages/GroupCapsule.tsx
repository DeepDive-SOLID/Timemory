import { useState } from "react";
import StatusBar from "../components/APP/StatusBar";
import { plus_circle } from "../assets";
import CategoryModal from "../components/UI/CategoryModal";
import { useParams } from "react-router-dom";

const GroupCapsule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groupId } = useParams<{ groupId: string }>();

  return (
    <div>
      <StatusBar to={"/home"} />

      <img
        src={plus_circle}
        alt="플러스 아이콘"
        onClick={() => setIsModalOpen(true)}
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamId={groupId ? Number(groupId) : undefined}
      />
    </div>
  );
};

export default GroupCapsule;

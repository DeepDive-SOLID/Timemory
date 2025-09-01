import { useState, useEffect } from "react";
import StatusBar from "../components/APP/StatusBar";
import { plus_circle } from "../assets";
import CategoryModal from "../components/UI/CategoryModal";
import {useNavigate, useParams} from "react-router-dom";
import { getTeamById } from "../api/groupApi";
import type { TeamResponseDto } from "../types/group";
import { profile_img } from "../assets";

const GroupCapsule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groupId } = useParams<{ groupId: string }>();
  const [team, setTeam] = useState<TeamResponseDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      if (!groupId) return;
      try {
        const data = await getTeamById(Number(groupId));
        setTeam(data);
      } catch (e) {
        console.error("팀 상세 조회 실패:", e);
      }
    };

    fetchTeam();
  }, [groupId]);

  // 캡슐 리스트 구현 대체
  const handleCardClick = () => {
    const capsuleId = 8;
    navigate("/detail", { state: { id: capsuleId} });
  };

  return (
    <div>
      {team && (
        <StatusBar
          to="/group"
          title={`${team.teamName} (${team.members.length})`}
          members={team.members.map((m) => m.profileImg ?? profile_img)}
        />
      )}

      <img
        src={plus_circle}
        alt="플러스 아이콘"
        onClick={() => setIsModalOpen(true)}
      />

      <div>
        <div onClick={handleCardClick}>캡슐 내용 보기</div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamId={groupId ? Number(groupId) : undefined}
      />
    </div>
  );
};

export default GroupCapsule;

import { useState, useEffect } from "react";
import StatusBar from "../components/APP/StatusBar";
import CategoryModal from "../components/UI/CategoryModal";
import {useNavigate, useParams} from "react-router-dom";
import { getTeamById } from "../api/groupApi";
import type { TeamResponseDto } from "../types/group";
import { profile_img } from "../assets";
import DateCapsule from "../components/Domain/Group/DateCapsule";
import MapCapsule from "../components/Domain/Group/MapCapsule";
import ConditionCapsule from "../components/Domain/Group/ConditionCapsule";
import { CapsuleCndtListApi, CapsuleDateListApi } from "../api/CapsuleApi";
import type { CapsuleCndtListDto, CapsuleDateListDto } from "../types/capsule";
import PlusButton from "../components/Domain/Group/PlusButton";
import style from "../styles/GroupCapsule.module.scss";

const GroupCapsule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groupId } = useParams<{ groupId: string }>();
  const [team, setTeam] = useState<TeamResponseDto | null>(null);
  const [capsuleDate, setCapsuleDate] = useState<CapsuleDateListDto[] | undefined>();
  const [capsuleCndt, setCapsuleCndt] = useState<CapsuleCndtListDto[] | undefined>();
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

    const fetchDateCapsule = async () => {
      if (!groupId) return;
      try {
        const data = await CapsuleDateListApi(Number(groupId));
        console.log(data);
        setCapsuleDate(data);
      } catch (e) {
        console.error("날짜 캡슐 조회 실패:", e);
      }
    };
    const fetchCndtCapsule = async () => {
      if (!groupId) return;
      try {
        const data = await CapsuleCndtListApi(Number(groupId));
        console.log(data);
        setCapsuleCndt(data);
      } catch (e) {
        console.error("조건 캡슐 조회 실패:", e);
      }
    };
    fetchTeam();
    fetchDateCapsule();
    fetchCndtCapsule();
  }, [groupId]);

  // 캡슐 리스트 구현 대체
  const handleCardClick = () => {
    const capsuleId = 8;
    navigate("/detail", { state: { id: capsuleId} });
  };

  return (
    <div className={`${style.wrapper}`}>
      {isModalOpen && <div className={style.screen}></div>}
      {team && <StatusBar to='/group' title={`${team.teamName} (${team.members.length})`} members={team.members.map((m) => m.profileImg ?? profile_img)} />}
        <div>
            <div onClick={handleCardClick}>캡슐 내용 보기</div>
        </div>
      <DateCapsule capsuleDate={capsuleDate} />
      <MapCapsule groupId={groupId} />
      <ConditionCapsule capsuleCndt={capsuleCndt} />
      <PlusButton setIsModalOpen={setIsModalOpen} />
      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} teamId={groupId ? Number(groupId) : undefined} />
    </div>
  );
};

export default GroupCapsule;

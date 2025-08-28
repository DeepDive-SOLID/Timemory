import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/Group.module.scss";
import {
  plus_circle,
  x_circle,
  rectangle_radius_10,
  rectangle_large,
} from "../../assets";

import {
  getTeamById,
  leaveTeam,
  addTeamMember,
  updateTeam,
} from "../../api/groupApi";
import { getCurrentMemberId } from "../../utils/auth";
import ConfirmModal from "./ConfirmModal";
import type {
  GroupEditProps as GroupProps,
  EditableMemberItem as Member,
} from "../../types/groupModals";

const GroupModal = ({ isOpen, onClose, teamId }: GroupProps) => {
  const [groupName, setGroupName] = useState("");
  const [inviteInput, setInviteInput] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      if (!isOpen || !teamId) return;
      try {
        setLoading(true);
        const data = await getTeamById(teamId);
        const currentId = getCurrentMemberId();
        setGroupName(data.teamName);
        const mapped = (data.members || []).map((m) => ({
          id: m.memberId,
          name: m.nickname,
          avatar: m.profileImg,
          isRemovable: currentId ? m.memberId === currentId : false,
        }));
        mapped.sort((a, b) => {
          if (a.id === currentId && b.id !== currentId) return -1;
          if (b.id === currentId && a.id !== currentId) return 1;
          return 0;
        });
        setMembers(mapped);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetail();
  }, [isOpen, teamId]);

  const handleAddMember = async () => {
    const nickname = inviteInput.trim();
    if (!nickname || !teamId) return;
    try {
      const created = await addTeamMember(teamId, nickname);
      // 중복 방지
      if (members.some((m) => m.id === created.memberId)) {
        setInviteInput("");
        return;
      }
      const currentId = getCurrentMemberId();
      const newMember: Member = {
        id: created.memberId,
        name: created.nickname,
        avatar: created.profileImg,
        isRemovable: currentId ? created.memberId === currentId : false,
      };
      setMembers((prev) => [...prev, newMember]);
      setInviteInput("");
    } catch {
      alert("초대에 실패했어요. 닉네임을 확인해주세요.");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    const currentId = getCurrentMemberId();
    if (!currentId || memberId !== currentId || !teamId) return;

    setConfirmOpen(true);
  };

  const confirmLeave = () => {
    if (!teamId) return;
    leaveTeam(teamId)
      .then(() => {
        setConfirmOpen(false);
        onClose();
        if (location.pathname === "/group") {
          navigate(0);
        } else {
          navigate("/group", { replace: true });
        }
      })
      .catch(() => {
        setConfirmOpen(false);
        alert("탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.");
      });
  };

  const cancelLeave = () => {
    setConfirmOpen(false);
  };

  const handleUpdateTeam = async () => {
    if (!teamId) return;
    try {
      setLoading(true);
      const updated = await updateTeam(teamId, {
        teamName: groupName.trim() || undefined,
      });
      // 응답으로 이름 최신화
      setGroupName(updated.teamName);
      // 닫고 목록 새로고침
      onClose();
      if (location.pathname === "/group") {
        navigate(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddMember();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>그룹 수정</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={x_circle} alt="Close" />
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* 그룹명 입력 */}
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <label className={styles.label}>그룹명</label>
              <div className={styles.inputContainer}>
                <img
                  src={rectangle_radius_10}
                  alt=""
                  className={styles.inputBackground}
                />
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className={styles.input}
                  placeholder="그룹명을 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 초대 입력 */}
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <label className={styles.label}>초대</label>
              <div className={styles.inputContainer}>
                <img
                  src={rectangle_radius_10}
                  alt=""
                  className={styles.inputBackground}
                />
                <div className={styles.inviteInputWrapper}>
                  <input
                    type="text"
                    value={inviteInput}
                    onChange={(e) => setInviteInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.inviteInput}
                    placeholder="초대할 닉네임을 작성해주세요"
                    style={{
                      marginTop: "8px",
                      paddingLeft: "20px",
                    }}
                  />
                  <button
                    className={styles.addButton}
                    onClick={handleAddMember}
                  >
                    <img src={plus_circle} alt="Add" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 멤버 목록 */}
          <div className={styles.membersSection}>
            <div className={styles.membersLabel}>MEMBER ({members.length})</div>
            <div className={styles.membersContainer}>
              <img
                src={rectangle_large}
                alt=""
                className={styles.membersBackground}
              />
              <div className={styles.membersContent}>
                <div className={styles.membersList}>
                  {members.map((member) => (
                    <div key={member.id} className={styles.memberItem}>
                      <div className={styles.memberAvatar}>
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className={styles.avatarImage}
                          />
                        ) : (
                          <div className={styles.avatarPlaceholder}></div>
                        )}
                      </div>
                      <span className={styles.memberName}>{member.name}</span>
                      {member.isRemovable && (
                        <button
                          className={styles.leaveButton}
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          탈퇴하기
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 그룹 수정 버튼 */}
        <div className={styles.modalFooter}>
          <button
            className={styles.createButton}
            onClick={handleUpdateTeam}
            disabled={!groupName.trim() || loading}
          >
            {loading ? "로딩 중..." : "그룹 수정"}
          </button>
        </div>
      </div>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="팀 탈퇴"
        message="정말 탈퇴하시겠어요? 이 작업은 되돌릴 수 없어요."
        confirmText="탈퇴하기"
        cancelText="취소"
        onConfirm={confirmLeave}
        onCancel={cancelLeave}
      />
    </div>
  );
};

export default GroupModal;

import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/Group.module.scss";
import {
  plus_circle,
  x_circle,
  rectangle_radius_10,
  rectangle_large,
} from "../../assets";
import {
  searchMemberByExactNickname,
  getCurrentUserProfile,
} from "../../api/memberApi";
import type { MemberResponseDto } from "../../types/member";
import { createTeam } from "../../api/groupApi";
import type { TeamCreateRequestDto } from "../../types/group";
import type {
  GroupCreateProps,
  EditableMemberItem as MemberItem,
} from "../../types/groupModals";

const GroupModal = ({ isOpen, onClose }: GroupCreateProps) => {
  const [groupName, setGroupName] = useState("");
  const [inviteInput, setInviteInput] = useState("");
  const [members, setMembers] = useState<MemberItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 모달이 열릴 때 현재 로그인 사용자로 초기 멤버 세팅
  useEffect(() => {
    if (!isOpen) return;
    const initializeSelf = async () => {
      try {
        const me = await getCurrentUserProfile();
        setMembers([
          {
            id: me.id,
            name: me.nickname,
            avatar: me.profileImg,
            isRemovable: false,
          },
        ]);
      } catch {
        // 조회 실패 시 기본 표시
        setMembers([{ id: "me", name: "나", isRemovable: false }]);
      } finally {
        setInviteInput("");
      }
    };
    initializeSelf();
  }, [isOpen]);

  const handleAddMember = async () => {
    const nickname = inviteInput.trim();
    if (!nickname) return;

    try {
      const found: MemberResponseDto | null = await searchMemberByExactNickname(
        nickname
      );
      if (!found) return;

      // 중복 방지 (이미 추가된 경우 무시)
      const alreadyExists = members.some(
        (m) => m.id === found.id || m.name === found.nickname
      );
      if (alreadyExists) {
        setInviteInput("");
        return;
      }

      const newMember: MemberItem = {
        id: found.id,
        name: found.nickname,
        avatar: found.profileImg,
        isRemovable: true,
      };
      setMembers((prev) => [...prev, newMember]);
      setInviteInput("");
    } catch {
      console.error("멤버 검색 실패");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  const handleCreateGroup = async () => {
    const name = groupName.trim();
    if (!name) return;

    try {
      // 요청 본문: 팀명 + 초대 닉네임 목록(본인은 서버에서 자동 포함)
      const inviteNicknames = members
        .filter((m) => m.isRemovable) // 본인 제외
        .map((m) => m.name);

      const payload: TeamCreateRequestDto = {
        teamName: name,
        inviteNicknames,
      };

      await createTeam(payload);

      // 성공 처리
      setGroupName("");
      setMembers([
        {
          id: "me",
          name: members.find((m) => !m.isRemovable)?.name || "나",
          avatar: members.find((m) => !m.isRemovable)?.avatar,
          isRemovable: false,
        },
      ]);
      onClose();
      if (location.pathname === "/groups") {
        // 현재 목록 화면이면 즉시 새로고침
        navigate(0);
      } else {
        // 목록 화면으로 이동
        navigate("/groups", { replace: true });
      }
    } catch {
      console.error("팀 생성 실패");
      alert("팀 생성에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddMember();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>그룹 생성</h2>
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
                    onKeyDown={handleKeyDown}
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
                          className={styles.removeButton}
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <img src={x_circle} alt="Remove" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 그룹 생성 버튼 */}
        <div className={styles.modalFooter}>
          <button
            className={styles.createButton}
            onClick={handleCreateGroup}
            disabled={!groupName.trim()}
          >
            그룹 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;

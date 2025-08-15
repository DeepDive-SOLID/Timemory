import { useState } from "react";
import styles from "../../styles/Group.module.scss";
import {
  plus_circle,
  x_circle,
  rectangle_radius_10,
  rectangle_large,
} from "../../assets";

interface GroupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupName: string, members: string[]) => void;
}

interface Member {
  id: string;
  name: string;
  avatar?: string;
  isRemovable: boolean;
}

const GroupModal = ({ isOpen, onClose, onCreateGroup }: GroupProps) => {
  const [groupName, setGroupName] = useState("");
  const [inviteInput, setInviteInput] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "나옹", isRemovable: false },
    { id: "2", name: "user1", isRemovable: true },
    { id: "3", name: "user2", isRemovable: true },
  ]);

  const handleAddMember = () => {
    if (inviteInput.trim()) {
      const newMember: Member = {
        id: Date.now().toString(),
        name: inviteInput.trim(),
        isRemovable: true,
      };
      setMembers([...members, newMember]);
      setInviteInput("");
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      onCreateGroup(
        groupName,
        members.map((m) => m.name)
      );
      setGroupName("");
      setMembers([{ id: "1", name: "나옹", isRemovable: false }]);
      onClose();
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
                        {/* 기본 아바타 이미지 */}
                        <div className={styles.avatarPlaceholder}></div>
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

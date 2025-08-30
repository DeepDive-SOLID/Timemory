export interface GroupCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GroupEditProps {
  isOpen: boolean;
  onClose: () => void;
  teamId?: number;
}

export interface EditableMemberItem {
  id: string;
  name: string;
  avatar?: string;
  isRemovable: boolean;
}

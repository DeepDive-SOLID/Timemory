export interface GroupTabsProps {
  activeTab: "my" | "open";
  onTabChange: (tab: "my" | "open") => void;
  onAddGroup?: () => void;
}

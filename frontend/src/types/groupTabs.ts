export interface GroupTabsProps {
  activeTab: "my" | "all";
  onTabChange: (tab: "my" | "all") => void;
  onAddGroup?: () => void;
}

export interface Group {
  id: number;
  name: string;
  memberCount?: number;
  date?: string;
  members: string[];
  profiles?: string[];
}

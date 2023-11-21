export type TaskType = {
  name: string;
  description: string | null;
  id: number;
  user: number;
  priority: string;
  created_at: Date;
  updated_at: Date;
  section: number;
};

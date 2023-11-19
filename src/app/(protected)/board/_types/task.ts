export type TaskType = {
  name: string;
  description: string | null;
  id: number;
  user: number;
  priority: number;
  created_at: Date;
  updated_at: Date;
};

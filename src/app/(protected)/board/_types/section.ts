import { TaskType } from "./task";

export type SectionType = {
  name: string;
  id: number;
  user: number;
  tasks: TaskType[];
  priority: string;
};

export type SectionsResponse = {
  count: number;
  next: null | number;
  previous: null | number;
  results: TaskType[];
};

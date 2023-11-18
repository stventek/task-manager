import { TaskType } from "../types/task";

export default function Task(props: TaskType) {
  return (
    <button className="no-animation btn bg-base-100 justify-start section-task">
      {props.name}
    </button>
  );
}

import { useState } from "react";
import { TaskType } from "../_types/task";

type PropsType = {
  save: (taskId: number, taskName: string) => void;
  cancel: () => void;
  task: TaskType;
};

export default function RenameTask(props: PropsType) {
  const [name, setName] = useState("");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        onChange={handleNameChange}
        onKeyDown={(e) => {
          if (e.key === "Escape") props.cancel();
        }}
        value={name}
        type="text"
        placeholder="Change name"
        className="input input-sm w-full section-task"
      />
      <div className="gap-2 flex">
        <button
          className="btn btn-sm btn-primary section-task"
          onClick={(e) => {
            if (name) props.save(props.task.id, name);
          }}
        >
          Save
        </button>
        <button
          onClick={(e) => props.cancel()}
          className="btn btn-sm btn-ghost section-task"
        >
          X
        </button>
      </div>
    </div>
  );
}

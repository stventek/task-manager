import { useState } from "react";

type PropsType = {
  save: (title: string) => void;
  cancel: () => void;
};

export default function AddTask(props: PropsType) {
  const [title, setTitle] = useState("");

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        onChange={handleTitleChange}
        value={title}
        type="text"
        placeholder="Enter a title for this card"
        className="input input-sm w-full section-task"
      />
      <div className="gap-2 flex">
        <button
          className="btn btn-sm btn-primary section-task"
          onClick={(e) => {
            props.save(title);
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

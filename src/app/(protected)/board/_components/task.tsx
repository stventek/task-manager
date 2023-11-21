import { useState } from "react";
import { TaskType } from "../_types/task";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { updateTask } from "@/shared/redux/sections";
import { useDispatch } from "react-redux";
import { getAccessToken } from "@/shared/utils/get-jwt";

export default function Task(props: TaskType) {
  const [name, setName] = useState(props.name);
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const dispatch = useDispatch();

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const renameTask = () => {
    if (!name) return;
    const headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    axios
      .patch<TaskType>(
        process.env.NEXT_PUBLIC_API_BASE + `/api/task/${props.id}/`,
        {
          name,
        },
        { headers }
      )
      .then((response) => {
        setIsUpdatingName(false);
        dispatch(updateTask({ task: response.data }));
      })
      .catch((err) => {});
  };

  return (
    <div id={`task-${props.id}`}>
      {isUpdatingName ? (
        <div className="flex flex-col gap-2">
          <input
            autoFocus
            onChange={handleNameChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsUpdatingName(false);
            }}
            value={name}
            type="text"
            placeholder="Change name"
            className="input input-sm section-task"
          />
          <div className="gap-2 flex">
            <button
              className="btn btn-sm btn-primary section-task"
              onClick={renameTask}
            >
              Save
            </button>
            <button
              onClick={() => setIsUpdatingName(false)}
              className="btn btn-sm btn-ghost section-task"
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <button className="w-full no-animation btn bg-base-100 justify-start section-task">
          <span className="text-ellipsis overflow-hidden flex-1 text-left section-task">
            {props.name}
          </span>
          <div
            onClick={() => setIsUpdatingName(true)}
            className="btn btn-xs btn-ghost section-task"
          >
            <FaPen className="section-task opacity-60" />
          </div>
        </button>
      )}
    </div>
  );
}

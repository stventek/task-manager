import axios from "axios";
import { SectionType } from "../_types/section";
import AddTask from "./add-task";
import Task from "./task";
import { TaskType } from "../_types/task";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/shared/redux/sections";
import { getAccessToken } from "@/shared/utils/get-jwt";
import { LexoRank } from "lexorank";

export default function Section(props: SectionType) {
  const [isAddingTask, setAddingTask] = useState(false);

  const dispatch = useDispatch();

  const createTask = (name: string) => {
    const headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };

    let priority;

    if (props.tasks.length > 0) {
      const lastTaskPriority = LexoRank.parse(props.tasks.at(-1)!.priority);
      priority = lastTaskPriority.genNext().toString();
    } else {
      priority = LexoRank.middle().toString();
    }

    axios
      .post<TaskType>(
        process.env.NEXT_PUBLIC_API_BASE + "/api/task/",
        {
          name,
          priority,
          section: props.id,
        },
        { headers }
      )
      .then((response) => {
        setAddingTask(false);
        dispatch(addTask({ task: response.data }));
      })
      .catch((err) => {});
  };

  return (
    <div className="section-task" id={`section-${props.id}`}>
      <div className="card w-80 shadow-xl bg-base-300 shrink-0 max-h-full">
        <div className="card-body p-4 h-full overflow-hidden">
          <div className="card-actions">
            <h2 className="card-title flex-1">{props.name}</h2>
            <button className="btn btn-square btn-sm btn-ghost section-task">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current section-task"
              >
                <path
                  className="section-task"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id={`section-container-${props.id}`}
            className="flex flex-col gap-2 section-container min-h-[48px] overflow-y-auto p-1"
          >
            {props.tasks.map((task) => (
              <Task key={task.id} {...task} />
            ))}
          </div>
          {isAddingTask ? (
            <AddTask save={createTask} cancel={() => setAddingTask(false)} />
          ) : (
            <button
              onClick={() => setAddingTask(true)}
              className={
                "btn btn-ghost justify-start btn-sm section-task no-animation"
              }
            >
              Add card...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

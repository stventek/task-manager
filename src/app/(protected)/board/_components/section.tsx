import { SectionType } from "../types/section";
import Task from "./task";

export default function Section(props: SectionType) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl bg-base-300 shrink-0">
      <div className="card-body p-4">
        <div className="card-actions">
          <h2 className="card-title flex-1">{props.name}</h2>
          <button className="btn btn-square btn-sm btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 section-container min-h-[48px]">
          {props.tasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
        <button className="btn btn-ghost justify-start btn-sm">
          Add card...
        </button>
      </div>
    </div>
  );
}

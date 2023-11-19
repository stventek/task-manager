import axios from "axios";
import { useState } from "react";
import { SectionType } from "../_types/section";
import { addSection } from "@/shared/redux/sections";
import { useDispatch } from "react-redux";

type PropsType = {
  sections: SectionType[];
};

export default function CreateSection(props: PropsType) {
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const dispatch = useDispatch();

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const createSection = () => {
    if (!name) return;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let priority;
    let lastSection = props.sections.at(-1);
    if (lastSection) priority = +lastSection.priority + 1000;
    else priority = 100000;

    axios
      .post<SectionType>(
        process.env.NEXT_PUBLIC_API_BASE + `/api/section/`,
        {
          name,
          priority,
        },
        { headers }
      )
      .then((response) => {
        setIsAdding(false);
        dispatch(addSection({ section: response.data }));
      })
      .catch((err) => {});
  };

  return (
    <div className="shrink-0 section-task w-80">
      {isAdding ? (
        <div className="flex flex-col gap-2 section-task bg-base-300 p-4 rounded-lg">
          <input
            autoFocus
            onChange={handleNameChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsAdding(false);
            }}
            value={name}
            type="text"
            placeholder="Enter a name for this list"
            className="input input-sm w-full section-task"
          />
          <div className="gap-2 flex">
            <button
              className="btn btn-sm btn-primary section-task"
              onClick={createSection}
            >
              Save
            </button>
            <button
              onClick={(e) => setIsAdding(false)}
              className="btn btn-sm btn-ghost section-task"
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-secondary w-full"
        >
          Add another list
        </button>
      )}
    </div>
  );
}

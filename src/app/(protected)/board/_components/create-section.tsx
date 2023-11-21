import axios from "axios";
import { FormEvent, useState } from "react";
import { SectionType } from "../_types/section";
import { addSection } from "@/shared/redux/sections";
import { useDispatch } from "react-redux";
import { getAccessToken } from "@/shared/utils/get-jwt";
import { LexoRank } from "lexorank";

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

  const createSection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return;
    const headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };

    let priority;

    if (props.sections.length > 0) {
      const lastSectionPriority = LexoRank.parse(
        props.sections.at(-1)!.priority
      );
      priority = lastSectionPriority.genNext().toString();
    } else {
      priority = LexoRank.middle().toString();
    }

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
        setName("");
        dispatch(addSection({ section: response.data }));
      })
      .catch((err) => {});
  };

  return (
    <div className="shrink-0 section-task w-80">
      {isAdding ? (
        <form
          onSubmit={createSection}
          className="flex flex-col gap-2 section-task bg-base-300 p-4 rounded-lg"
        >
          <input
            autoFocus
            onChange={handleNameChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setName("");
                setIsAdding(false);
              }
            }}
            value={name}
            type="text"
            placeholder="Enter a name for this list"
            className="input input-sm w-full section-task"
          />
          <div className="gap-2 flex">
            <button
              className="btn btn-sm btn-primary section-task"
              type="submit"
            >
              Save
            </button>
            <button
              onClick={(e) => {
                setName("");
                setIsAdding(false);
              }}
              className="btn btn-sm btn-ghost section-task"
            >
              X
            </button>
          </div>
        </form>
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

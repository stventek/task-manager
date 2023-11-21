"use client";

import dragula from "dragula";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SectionType, SectionsResponse } from "../_types/section";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  replaceSections,
  sectionsStateType,
  sectionsStore,
  updateSection,
  updateTask,
} from "@/shared/redux/sections";
import Section from "./section";
import { memo } from "react";
import CreateSection from "./create-section";
import { getAccessToken } from "@/shared/utils/get-jwt";
import { handleDrop, handleTaskDrop } from "@/shared/utils/handle-drake-drop";
import { TaskType } from "../_types/task";

const SectionMemo = memo(Section);

const getAxiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

function Sections() {
  const state = useSelector((state: sectionsStateType) => state.sections);
  const dispatch = useDispatch();
  const drakeSectionsContainerRef = useRef<dragula.Drake | null>(null);
  const drakeSectionContainerRef = useRef<dragula.Drake | null>(null);
  const stateRef = useRef<SectionType[] | null>(null);
  const isUpdatingPriority = useRef<boolean>(false);

  useEffect(() => {
    drakeSectionContainerRef.current = dragula({
      moves: (el, container, handle, sibling) => {
        if (isUpdatingPriority.current) return false;
        return true;
      },
    });

    drakeSectionsContainerRef.current = dragula(
      [document.getElementById("sections-container")!],
      {
        direction: "horizontal",
        moves: (el, container, handle, sibling) => {
          if (isUpdatingPriority.current) return false;
          const containsClass = handle!.classList.contains("section-task");
          const parentContainsClass =
            handle!.parentElement!.classList.contains("section-task");
          return !(containsClass || parentContainsClass);
        },
      }
    );

    hydrate();
    onSectionDrop();
    onTaskDrop();

    return drakeCleanUp;
  }, []);

  const drakeCleanUp = () => {
    if (drakeSectionsContainerRef.current) {
      drakeSectionsContainerRef.current.destroy();
      drakeSectionsContainerRef.current = null;
    }
    if (drakeSectionContainerRef.current) {
      drakeSectionContainerRef.current.destroy();
      drakeSectionContainerRef.current = null;
    }
  };

  const hydrate = () => {
    axios
      .get<SectionsResponse>(
        process.env.NEXT_PUBLIC_API_BASE + "/api/section?ordering=priority",
        getAxiosConfig()
      )
      .then((response) => {
        dispatch(replaceSections(response.data.results));
      });
  };

  const onSectionDrop = () => {
    drakeSectionsContainerRef.current!.on("drop", (el, target, source) => {
      const id = +el.id.split("section-")[1];
      const priority = handleDrop(el, stateRef.current!).toString();
      changeSectionPosition(id, priority);
    });
  };

  const onTaskDrop = () => {
    drakeSectionContainerRef.current!.on("drop", (el, target, source) => {
      const id = +el.id.split("task-")[1];
      const sectionId = +target.id.split("section-container-")[1];
      const section = stateRef.current!.find(
        (section) => section.id === sectionId
      )!;

      const priority = handleTaskDrop(el, section.tasks).toString();

      // see bevacqua/react-dragula/issues/23
      if (target !== source) {
        el.setAttribute("style", "display: none;");
        drakeSectionContainerRef.current!.cancel(true);
      }

      changeTaskPosition(id, priority, sectionId, el);
    });
  };

  //update section containers when state changes
  useEffect(() => {
    drakeSectionContainerRef.current!.containers = [].slice.apply(
      document.querySelectorAll(".section-container")
    );
    stateRef.current = state;
  }, [state]);

  const changeSectionPosition = (id: number, priority: string) => {
    isUpdatingPriority.current = true;
    axios
      .patch<SectionType>(
        process.env.NEXT_PUBLIC_API_BASE + `/api/section/${id}/`,
        {
          priority,
        },
        getAxiosConfig()
      )
      .then((response) => {
        isUpdatingPriority.current = false;
        dispatch(updateSection({ section: response.data }));
      })
      .catch((err) => {});
  };

  const changeTaskPosition = (
    id: number,
    priority: string,
    section: number | null,
    el: Element
  ) => {
    isUpdatingPriority.current = true;
    const data = section ? { priority, section } : { priority };

    axios
      .patch<TaskType>(
        process.env.NEXT_PUBLIC_API_BASE + `/api/task/${id}/`,
        data,
        getAxiosConfig()
      )
      .then((response) => {
        isUpdatingPriority.current = false;
        dispatch(updateTask({ task: response.data }));
      })
      .catch((err) => {
        isUpdatingPriority.current = false;
        el.setAttribute("style", "display: block;");
      });
  };

  return (
    <main>
      <div
        id="sections-container"
        className="h-screen flex px-8 pt-20 pb-4 gap-4 overflow-x-auto max-w-fit"
      >
        {state.map((section) => (
          <SectionMemo key={section.id} {...section} />
        ))}
        <CreateSection sections={state} />
      </div>
    </main>
  );
}

export default function SectionsWrapper() {
  return (
    <Provider store={sectionsStore}>
      <Sections />
    </Provider>
  );
}

"use client";

import { useOnMountUnsafe } from "@/shared/utils/on-mount-unsafe";
import dragula from "dragula";
import { EffectCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { SectionType, SectionsResponse } from "../_types/section";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  replaceSections,
  sectionsStateType,
  sectionsStore,
} from "@/shared/redux/sections";
import Section from "./section";
import { memo } from "react";
import CreateSection from "./create-section";
import { getAccessToken } from "@/shared/utils/get-jwt";

const SectionMemo = memo(Section);

function Sections() {
  const state = useSelector((state: sectionsStateType) => state.sections);
  const dispatch = useDispatch();
  const drakeSectionsContainerRef = useRef<dragula.Drake | null>(null);
  const drakeSectionContainerRef = useRef<dragula.Drake | null>(null);

  useEffect(() => {
    drakeSectionContainerRef.current = dragula();
    drakeSectionsContainerRef.current = dragula(
      [document.getElementById("sections-container")!],
      {
        direction: "horizontal",
        moves: (el, container, handle, sibling) => {
          const containsClass = handle!.classList.contains("section-task");
          const parentContainsClass =
            handle!.parentElement!.classList.contains("section-task");
          return !(containsClass || parentContainsClass);
        },
      }
    );
    const headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    axios
      .get<SectionsResponse>(
        process.env.NEXT_PUBLIC_API_BASE + "/api/section?ordering=priority",
        { headers }
      )
      .then((response) => {
        dispatch(replaceSections(response.data.results));
      });
    let cleanup = () => {
      if (drakeSectionsContainerRef.current) {
        drakeSectionsContainerRef.current.destroy();
      }
      if (drakeSectionContainerRef.current) {
        drakeSectionContainerRef.current.destroy();
      }
    };
    return cleanup;
  }, []);

  useEffect(() => {
    if (drakeSectionContainerRef.current) {
      drakeSectionContainerRef.current.containers = [].slice.apply(
        document.querySelectorAll(".section-container")
      );
    }
  }, [state]);

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

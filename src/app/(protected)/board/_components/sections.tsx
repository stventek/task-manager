"use client";

import { useOnMountUnsafe } from "@/shared/utils/on-mount-unsafe";
import dragula from "dragula";
import { EffectCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { SectionType, SectionsResponse } from "../types/section";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  replaceSections,
  sectionsStateType,
  sectionsStore,
} from "@/shared/redux/sections";
import Section from "./section";

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
        moves: (el, container, handle) => {
          return !handle!.classList.contains("section-task");
        },
      }
    );
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    axios
      .get<SectionsResponse>(
        process.env.NEXT_PUBLIC_API_BASE + "/api/section",
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
      <div id="sections-container" className="flex m-8 gap-4 items-start">
        {state.map((section) => (
          <Section key={section.id} {...section} />
        ))}
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

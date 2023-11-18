import { SectionType } from "@/app/(protected)/board/types/section";
import { createSlice, configureStore } from "@reduxjs/toolkit";

export type sectionsStateType = { sections: SectionType[] };

const initialState: sectionsStateType = { sections: [] };

const sectionsSlice = createSlice({
  name: "sections",
  initialState: initialState,
  reducers: {
    replaceSections: (state, action) => {
      state.sections = action.payload;
    },
    addTask: (state, action) => {
      state.sections.some((section) => {
        const task = action.payload.task;
        if (section.id === task.id) {
          section.tasks.push(task);
          return true;
        }
      });
    },
  },
});

export const { replaceSections, addTask } = sectionsSlice.actions;

export const sectionsStore = configureStore({
  reducer: sectionsSlice.reducer,
});

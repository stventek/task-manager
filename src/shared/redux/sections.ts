import { SectionType } from "@/app/(protected)/board/_types/section";
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
        if (section.id === task.section) {
          section.tasks.push(task);
          return true;
        }
      });
    },
    updateTask: (state, action) => {
      const task = action.payload.task;
      state.sections.some((section) => {
        if (section.id === task.section) {
          section.tasks.some((sectionTask) => {
            if (sectionTask.id === task.id) {
              Object.assign(sectionTask, task);
              return true;
            }
          });
          return true;
        }
      });
    },
    addSection: (state, action) => {
      const section = action.payload.section;
      state.sections.push(section);
    },
  },
});

export const { replaceSections, addTask, updateTask, addSection } =
  sectionsSlice.actions;

export const sectionsStore = configureStore({
  reducer: sectionsSlice.reducer,
});

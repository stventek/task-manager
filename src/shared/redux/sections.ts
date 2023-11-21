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

      const oldSection = state.sections.find((section) =>
        section.tasks.some((sectionTask) => sectionTask.id === task.id)
      )!;
      const oldTaskIndex = oldSection.tasks.findIndex(
        (sectionTask) => sectionTask.id === task.id
      );

      if (task.section !== oldSection.tasks[oldTaskIndex].section) {
        // Remove the task from the old section
        oldSection.tasks.splice(oldTaskIndex, 1);
        const newSection = state.sections.find(
          (section) => section.id === task.section
        )!;
        newSection.tasks.push(task);
        // Sort tasks in the new section by priority
        newSection.tasks.sort((a, b) => {
          if (a.priority < b.priority) {
            return -1;
          }
          if (b > a) {
            return 1;
          }
          return 0;
        });
      } else {
        Object.assign(oldSection.tasks[oldTaskIndex], task);
      }
    },
    addSection: (state, action) => {
      const section = action.payload.section;
      state.sections.push(section);
    },
    updateSection: (state, action) => {
      const section = action.payload.section;
      state.sections.some((sectionE) => {
        if (sectionE.id === section.id) {
          Object.assign(sectionE, section);
        }
      });
    },
  },
});

export const {
  replaceSections,
  addTask,
  updateTask,
  addSection,
  updateSection,
} = sectionsSlice.actions;

export const sectionsStore = configureStore({
  reducer: sectionsSlice.reducer,
});

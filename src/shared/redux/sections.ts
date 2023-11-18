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
  },
});

export const { replaceSections } = sectionsSlice.actions;

export const sectionsStore = configureStore({
  reducer: sectionsSlice.reducer,
});

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SiteState {
  loading: boolean;
  routerPrev: string;
  sort: any;
  darkMode: boolean;
}

const initialState: SiteState = {
  loading: true,
  routerPrev: "/",
  sort: {},
  darkMode: false,
};

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    updateRouterPrev: (state, action: PayloadAction<string>) => {
      state.routerPrev = action?.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
    updateSort: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      state.sort = {
        ...state.sort,
        [action.payload.name]: action.payload.value,
      };
    },
    resetSort: (state) => {
      state.sort = {};
    },
    toogleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  updateRouterPrev,
  setLoading,
  updateSort,
  resetSort,
  toogleDarkMode,
} = siteSlice.actions;
// Action creators are generated for each case reducer function
export default siteSlice.reducer;

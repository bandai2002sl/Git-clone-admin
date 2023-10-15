import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  tokenWs: string | null;
  isLogin: boolean;
  permissionList: any[];
}

const initialState: AuthState = {
  token: null,
  tokenWs: null,
  isLogin: false,
  permissionList: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action?.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.tokenWs = null;
    },
    setStateLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action?.payload;
    },
    setPermissionList: (state, action: { payload: any[] }) => {
      state.permissionList = action?.payload;
    },
  },
});

export const { setToken, setStateLogin, logout, setPermissionList } =
  authSlice.actions;
export default authSlice.reducer;

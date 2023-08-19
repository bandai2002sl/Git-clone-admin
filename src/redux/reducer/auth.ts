import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
	token: string | null;
	tokenWs: string | null;
	isLogin: boolean;
}

const initialState: AuthState = {
	token: null,
	tokenWs: null,
	isLogin: false,
};

export const authSlice = createSlice({
	name: 'auth',
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
		setTokenWs: (state, action: PayloadAction<string | null>) => {
			state.tokenWs = action?.payload;
		},
		setStateLogin: (state, action: {payload: boolean}) => {
			state.isLogin = action?.payload;
		},
	},
});

export const {setToken, setStateLogin, setTokenWs, logout} = authSlice.actions;
export default authSlice.reducer;

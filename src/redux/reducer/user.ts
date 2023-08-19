import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InfoUser {
	fullName: string;
	nickName: string;
	expiredTime: string;
	needChangePass: boolean;
	isManager: boolean;
	image?: string;
}

interface UserState {
	infoUser: InfoUser | null;
}

const initialState: UserState = {
	infoUser: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInfoUser: (state, action: PayloadAction<any>) => {
			state.infoUser = action?.payload;
		},
		updateInfoUser: (state, action: PayloadAction<any>) => {
			state.infoUser = {...state.infoUser, ...action?.payload};
		},
	},
});

// Action creators are generated for each case reducer function
export const {setInfoUser, updateInfoUser} = userSlice.actions;
export default userSlice.reducer;

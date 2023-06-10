import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './state';

const initialState: AppState = {
    username: ''
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }
});

export const { setUsername } = appSlice.actions;

export default appSlice.reducer;

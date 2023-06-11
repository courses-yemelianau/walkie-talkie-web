import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './state';
import { User } from '../interfaces';

const initialState: AppState = {
    user: {
        name: ''
    }
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = appSlice.actions;

export default appSlice.reducer;

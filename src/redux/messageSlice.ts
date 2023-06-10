import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageState } from './state';
import { Status } from '../constants';
import { Message } from '../interfaces';

const initialState: MessageState = {
    status: Status.Idle,
    message: '',
    messages: []
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        fetchMessagesPending: (state) => {
            state.status = Status.Loading;
        },
        fetchMessagesFulfilled: (state, action: PayloadAction<Message[]>) => {
            state.status = Status.Succeeded;
            state.messages = action.payload;
            state.message = '';
        },
        fetchMessagesRejected: (state, action: PayloadAction<string>) => {
            state.status = Status.Failed;
            state.messages = [];
            state.message = action.payload;
        }
    }
});

export const {
    fetchMessagesPending,
    fetchMessagesRejected,
    fetchMessagesFulfilled
} = messageSlice.actions;

export default messageSlice.reducer;

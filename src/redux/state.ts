import { Status } from '../constants';
import { Message, User } from '../interfaces';

export interface AppState {
    user: User;
}

export interface FetchState {
    status: Status;
    message: string;
}

export interface MessageState extends FetchState {
    messages: Message[];
}

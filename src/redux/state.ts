import { Status } from '../constants';
import { ReceivedMessage } from '../interfaces';

export interface AppState {
    username: string;
}

export interface FetchState {
    status: Status;
    message: string;
}

export interface MessageState extends FetchState {
    messages: ReceivedMessage[];
}

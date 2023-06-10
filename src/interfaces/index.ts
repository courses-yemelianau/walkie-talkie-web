export interface Message {
    recipient: string;
    title: string;
    message: string;
}

export interface ReceivedMessage {
    username: string;
    title: string;
    message: string;
}

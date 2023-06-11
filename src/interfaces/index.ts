export interface User {
    id?: number;
    name: string;
}

export interface Message {
    id: number;
    recipientId: number;
    username: string;
    title: string;
    message: string;

    createdAt: string;
    updatedAt: string;
}

export interface CreateUserDto {
    name: string;
}

export interface CreateMessageDto {
    recipient: string;
    username: string;
    title: string;
    message: string;
}

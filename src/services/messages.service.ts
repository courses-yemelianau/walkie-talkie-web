import axios from '../config';
import { Message } from '../interfaces';
import { Response } from '../interfaces/response.interface';
import { CreateMessageDto } from '../dtos';

const path = '/messages';

export const getMessages = (id: number) => {
    return axios.get<Response<Message[]>>(`${path}/${id}`);
};

export const createMessage = (messageData: CreateMessageDto) => {
    return axios.post<Response<Message>>(`${path}`, messageData);
};

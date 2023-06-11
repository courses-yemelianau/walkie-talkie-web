import axios from '../config';
import { User } from '../interfaces';
import { Response } from '../interfaces/response.interface';
import { CreateUserDto } from '../dtos';

const path = '/users';

export const getUsers = () => {
    return axios.get<Response<User[]>>(`${path}`);
};

export const createUser = (userData: CreateUserDto) => {
    return axios.post<Response<User>>(`${path}`, userData);
};

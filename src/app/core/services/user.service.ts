import { Injectable } from '@angular/core';
import { apiService } from "./api/api.service";
import { User } from '../models/User';
import { UserMapper } from '../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(
        private userMapper: UserMapper
    ) { }

    async GetAllUsers() {
        return this.userMapper.mapFromArray(await apiService('/User', 'GET'));
    }

    async GetUserByName(name: string) {
        return this.userMapper.mapFromArray(await apiService(`/User/search?name=${name}`, 'GET'));
    }

    async CreateUser(user: User) {
        await apiService('/User', 'POST', this.userMapper.mapTo(user));
    }

    async UpdateUser(user: User) {
        await apiService(`/User`, 'PUT', this.userMapper.mapTo(user));
    }

    async DeleteUser(id: number) {
        await apiService(`/User/${id}`, 'DELETE');
    }
}

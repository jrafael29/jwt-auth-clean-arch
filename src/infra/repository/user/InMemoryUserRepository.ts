import UserRepository from "../../../domain/repository/UserRepository";

import { User } from "../../../domain/entity/User";

export class InMemoryUserRepository implements UserRepository {

    private userList: User[] = [];
    private id = 1;


    async create(userData: {
        name: string,
        phonenumber: string,
        password: string
    }): Promise<User> {
        const newUser: User = {
            id: this.id++,
            ...userData,
            created_at: new Date()
        }
        this.userList.push(newUser);
        return newUser;
    }


}
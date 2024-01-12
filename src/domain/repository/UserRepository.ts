import { User } from "../entity/User"

export interface UserRepository {
    create(userData: {
        name: string,
        phonenumber: string,
        password: string
    }): Promise<User | undefined>

    getByPhone(value: string): Promise<User | undefined>
}
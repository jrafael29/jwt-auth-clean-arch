
import UserRepository from "../../../domain/repository/UserRepository";

import {Password} from "../../../domain/entity/Password";
import {User} from "../../../domain/entity/User";


type RegisterPayload = {
    name: string,
    phonenumber: string,
    password: string ,
    repeatPassword: string
} 

export class RegisterUseCase {

    constructor(private userRepository: UserRepository){}

    async execute(data: RegisterPayload): Promise<User | boolean>{
        if(!data.name || !data.phonenumber || !data.password || !data.repeatPassword)
            throw new Error("invalid fields");
        if(!data.phonenumber.startsWith('+') || data.phonenumber.length !== 14 )
            throw new Error("invalid phonenumber");
        if(data.password.length < 5 || data.repeatPassword.length < 5)
            throw new Error("password must be at least 5 characters");
        if(data.password !== data.repeatPassword) 
            throw new Error("passwords does not match");

        const encryptedPassword = await Password.hashPassword(data.password);
        const resultCreate = await this.userRepository.create({
            name: data.name,
            password: encryptedPassword,
            phonenumber: data.phonenumber
        })
        return resultCreate ?? false;
    }

}
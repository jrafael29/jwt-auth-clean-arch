import { RegisterPayload } from './../../types/RegisterPayload';
import { UserRepository } from "../../../domain/repository/UserRepository";
import { User } from "../../../domain/entity/User";
import { PasswordService } from '../../services/auth/PasswordService';
import { Register } from '../../../domain/features/auth/Register';


export class RegisterUseCase implements Register {

    constructor(private userRepository: UserRepository){}

    async execute(data: RegisterPayload): Promise<User | undefined>{
        this.validateInputData(data);

        const phoneAlreadyExists = await this.userRepository.getByPhone(data.phonenumber)
        if(phoneAlreadyExists) throw new Error("phonenumber already in use");

        const encryptedPassword = await PasswordService.hashPassword(data.password);
        const resultCreate = await this.userRepository.create({
            name: data.name,
            password: encryptedPassword,
            phonenumber: data.phonenumber
        })
        return resultCreate;
    }

    private validateInputData(data: RegisterPayload) {
        if(!data.name || !data.phonenumber || !data.password || !data.repeatPassword)
            throw new Error("invalid fields");
        if(!data.phonenumber.startsWith('+') || data.phonenumber.length !== 14 )
            throw new Error("invalid phonenumber");
        if(data.password.length < 5 || data.repeatPassword.length < 5)
            throw new Error("password must be at least 5 characters");
        if(data.password !== data.repeatPassword) 
            throw new Error("passwords does not match");
    }

}
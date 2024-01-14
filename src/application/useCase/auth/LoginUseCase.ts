
import { Login } from '../../../domain/features/auth/Login';
import { UserRepository } from '../../../domain/repository/UserRepository';
import { JwtService } from '../../services/auth/JwtService';
import { PasswordService } from '../../services/auth/PasswordService';
import { LoginPayload } from './../../types/LoginPayload';



export class LoginUseCase implements Login {

    constructor(private repository: UserRepository){}

    async execute(inputData: LoginPayload): Promise<string | undefined>{
        if(!inputData.credential.length || !inputData.password.length)
            throw new Error('invalid fields');


        // busca o usuario apartir da credential. 
        const userExists = await this.repository.getByPhone(inputData.credential);

        // se existir usuario, verifica se a senha enviada corresponde à senha criptografada salva.
        if(!userExists){
            throw new Error("user not found");
        }
        const passwordMatch = await PasswordService.comparePassword(userExists.getPassword(), inputData.password)

        if(!passwordMatch) {
            throw new Error("incorrect password");
        }

        const userAuthInfoToToken = {
            id: userExists.getId()
        } 

        const token = JwtService.sign({user: JSON.stringify(userAuthInfoToToken)})
        return token.value
    }
}
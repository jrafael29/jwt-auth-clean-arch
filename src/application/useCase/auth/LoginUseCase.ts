
import { Login } from '../../../domain/features/auth/Login';
import { UserRepository } from '../../../domain/repository/UserRepository';
import { JwtService } from '../../services/auth/JwtService';
import { PasswordService } from '../../services/auth/passwordService';
import { LoginPayload } from './../../types/LoginPayload';



export class LoginUseCase implements Login {

    constructor(
        private userRepository: UserRepository
    ){}

    async execute(data: LoginPayload): Promise<string | undefined>{
        if(!data.credential.length || !data.password.length)
            throw new Error('invalid fields');


        // busca o usuario apartir da credential. 
        const user = await this.userRepository.getByPhone(data.credential);

        // se existir usuario, verifica se a senha enviada corresponde à senha criptografada salva.
        if(!user){
            throw new Error("user not found");
        }
        const passwordMatch = await PasswordService.comparePassword(user.password, data.password)

        if(!passwordMatch) {
            throw new Error("incorrect password");
        }

        const {password, ...userToToken} = user 

        
        const token = JwtService.sign({user: JSON.stringify(userToToken)})
        return token.value
    }
}
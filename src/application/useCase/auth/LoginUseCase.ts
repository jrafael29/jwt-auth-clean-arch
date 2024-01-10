import { LoginPayload } from './../../types/LoginPayload';


export class LoginUseCase {

    constructor(){}

    execute(data: LoginPayload): any{
        if(!data.credential.length || !data.password.length)
            throw new Error('invalid fields');
    }

}
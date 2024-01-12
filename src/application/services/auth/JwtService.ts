import jwt, { TokenExpiredError } from 'jsonwebtoken'


interface Auth {
    login(credential: string, password: string): void;

    verify(token: string): void;

    signUp(): void;
}

type Token = {
    value: string;
}

export class JwtService {

    private static readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "hehe"

    constructor(){}


    static sign(payload: string | object | Buffer): Token {
        if(!payload)
        throw new Error("invalid payload");

        const token = jwt.sign(payload, JwtService.JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '7h'
        })
        return {
            value: token
        }
    }

    static verify(token: string): string | object {
        try{
            const result = jwt.verify(token, JwtService.JWT_SECRET_KEY);
            return result
        }catch(err: any){
            if(err.name === 'TokenExpiredError'){
                return err.message;
            }
            return 'internal server error';
        }

    }

}
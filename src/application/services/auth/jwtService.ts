import jwt from 'jsonwebtoken'


interface Auth {
    login(credential: string, password: string): void;

    verify(token: string): void;

    signUp(): void;
}

type Token = {
    value: string;
}

export class JWTService {

    constructor(){}


    static sign(payload: string | object | Buffer): Token {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "hehe"

        const token = jwt.sign(payload, JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '7h'
        })
        return {
            value: token
        }
    }

}
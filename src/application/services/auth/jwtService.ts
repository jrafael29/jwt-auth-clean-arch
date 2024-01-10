
interface Auth {
    login(credential: string, password: string): void;

    verify(token: string): void;

    signUp(): void;
}



class JWTService {

    constructor(){}



}
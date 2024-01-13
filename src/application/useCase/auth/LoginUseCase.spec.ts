import { RegisterUseCase } from './RegisterUseCase';
import userRepository from "../../../infra/repository/user/InMemoryUserRepository";
import { LoginUseCase } from "./LoginUseCase"

describe("Suite de teste para: LoginUseCase", () => {

    const loginUseCase = new LoginUseCase(userRepository);

    test("deveria lançar um erro caso um dos campos estejam vazios", () => {
        expect(async () => {
            await loginUseCase.execute({
                credential: "",
                password: "123456"
            })
        }).rejects.toThrow("invalid fields");
    })

    test("deveria lançar um erro caso um dos campos estejam vazios", () => {
        expect(async () => {
            await loginUseCase.execute({
                credential: "",
                password: "123456"
            })
        }).rejects.toThrow("invalid fields");
    })

    test("deveria lançar um erro caso o usuario não exista", () => {
        expect(async () => {
            await loginUseCase.execute({
                credential: "+5581991931921",
                password: "123456"
            })
        }).rejects.toThrow("user not found");
    })

    test("deveria criar um usuario e não autenticar com senha incorreta", async () => {

        const registerUseCase = new RegisterUseCase(userRepository);
        const userData = {
            name: "José",
            phonenumber: "+5581991931921",
            password: "123456",
            repeatPassword: "123456"
        }
        const user = await registerUseCase.execute(userData)
        

        expect(async () => {
            await loginUseCase.execute({
                credential: "+5581991931921",
                password: "1234567"
            })
        }).rejects.toThrow("incorrect password");
    })

    test("deveria criar um usuario e retornar um token de autenticação", async () => {

        const registerUseCase = new RegisterUseCase(userRepository);
        const userData = {
            name: "José",
            phonenumber: "+5581991931922",
            password: "123456",
            repeatPassword: "123456"
        }
        await registerUseCase.execute(userData)
        
        const token = await loginUseCase.execute({
            credential: userData.phonenumber,
            password: userData.password
        })

        const tokenParts = token?.split('.');

        expect(tokenParts?.length).toEqual(3);
    })

})
import { LoginUseCase } from "./LoginUseCase"

describe("Suite de teste para: LoginUseCase", () => {

    const loginUseCase = new LoginUseCase();

    test("deveria lançar um erro caso um dos campos estejam vazios", () => {
        expect(() => {
            loginUseCase.execute({
                credential: "",
                password: "123456"
            })
        }).toThrow("invalid fields");
    })

    test("deveria lançar um erro caso um dos campos estejam vazios", () => {
        expect(() => {
            loginUseCase.execute({
                credential: "",
                password: "123456"
            })
        }).toThrow("invalid fields");
    })


})
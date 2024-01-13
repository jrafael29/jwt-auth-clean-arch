import { RegisterUseCase } from "./RegisterUseCase";
import userRepository from "../../../infra/repository/user/InMemoryUserRepository";
import { User } from "../../../domain/entity/User";

const registerUseCase = new RegisterUseCase(userRepository);

describe("Suite de teste para: RegisterUseCase", () => {
  test("deveria lançar um erro caso as senhas não correspondam", () => {
    expect(
      async () =>
        await registerUseCase.execute({
          name: "José",
          phonenumber: "+5581991931921",
          password: "12345678",
          repeatPassword: "123456788",
        })
    ).rejects.toThrow("passwords does not match");
  });


  test("deveria lançar um erro caso as senhas possuam menos de 5 caractere", () => {
    expect(
      async () =>
        await registerUseCase.execute({
          name: "José",
          phonenumber: "+5581991931921",
          password: "123456",
          repeatPassword: "1234",
        })
    ).rejects.toThrow("password must be at least 5 characters");
  });

  test("deveria lançar um erro caso algum campo esteja vazio", () => {
    expect(
      async () =>
        await registerUseCase.execute({
          name: "",
          phonenumber: "+5581991931921",
          password: "123456",
          repeatPassword: "123456",
        })
    ).rejects.toThrow("invalid fields");

    expect(
      async () =>
        await registerUseCase.execute({
          name: "José",
          phonenumber: "",
          password: "123456",
          repeatPassword: "123456",
        })
    ).rejects.toThrow("invalid fields");

    expect(
      async () =>
        await registerUseCase.execute({
          name: "José",
          phonenumber: "+5581991931921",
          password: "",
          repeatPassword: "123456",
        })
    ).rejects.toThrow("invalid fields");

    expect(
      async () =>
        await registerUseCase.execute({
          name: "José",
          phonenumber: "+5581991931921",
          password: "123456",
          repeatPassword: "",
        })
    ).rejects.toThrow("invalid fields");
  });

  test("deveria lançar um erro caso o telefone nao siga o padrao: 14 caracteres, iniciando com '+'", () => {
    expect(
      async () =>
        await registerUseCase.execute({
          name: "José",
          phonenumber: "558199193192",
          password: "123456",
          repeatPassword: "123456",
        })
    ).rejects.toThrow("invalid phonenumber");
  });

  test("deveria criar um usuario", async () => {
    const resultRegister = await registerUseCase.execute({
      name: "José",
      phonenumber: "+5581991931921",
      password: "123456",
      repeatPassword: "123456",
    });
    expect(resultRegister).toHaveProperty("id");
    expect(resultRegister).toHaveProperty("created_at");
  });

  test("não deveria criar um usuario caso o numero ja esteja em uso", async () => {

    expect(async () => {
      await registerUseCase.execute({
        name: "José",
        phonenumber: "+5581991931921",
        password: "123456",
        repeatPassword: "123456",
      });
    }).rejects.toThrow("phonenumber already in use");

  });

});

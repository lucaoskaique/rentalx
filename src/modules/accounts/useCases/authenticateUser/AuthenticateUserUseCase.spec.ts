import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUserCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Shoud be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_licence: "123456789",
      email: "lucas@hotmail.com",
      name: "User Teste",
      password: "123456",
    };
    await createUserUseCase.execute(user);
    const userAuthenticated = await authenticateUserUserCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userAuthenticated).toHaveProperty("token");
  });

  it("Shoud not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_licence: "123456789",
        email: "lucas@hotmail.com",
        name: "User Teste",
        password: "123456",
      };
      await authenticateUserUserCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Shoud not be able to authenticate an user with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_licence: "123456789",
        email: "lucas@hotmail.com",
        name: "User Teste",
        password: "123456",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUserCase.execute({
        email: user.email,
        password: "wrongPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

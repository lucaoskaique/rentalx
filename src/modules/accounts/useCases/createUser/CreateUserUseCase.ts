import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_licence,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByName(name);

    if (userAlreadyExists) {
      throw new Error("User Already Exists!");
    }

    this.usersRepository.create({
      name,
      password,
      email,
      driver_licence,
    });
  }
}

export { CreateUserUseCase };

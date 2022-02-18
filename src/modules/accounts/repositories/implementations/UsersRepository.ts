import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    username,
    driver_licence,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      username,
      driver_licence,
    });

    await this.repository.save(user);
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name });

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

export { UsersRepository };

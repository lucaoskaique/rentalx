import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  findByName(name: string): Promise<User>;
  list(): Promise<User[]>;
  create({
    name,
    password,
    email,
    driver_licence,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };

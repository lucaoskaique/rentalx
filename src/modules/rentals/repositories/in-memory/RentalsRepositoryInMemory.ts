import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(user_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findByUser(user_id: string): Promise<Rental[]> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepositoryInMemory };

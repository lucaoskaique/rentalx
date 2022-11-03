import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

class ListAvailableCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, category_id, name);
    return cars;
  }
}

export { ListAvailableCarsUseCase };

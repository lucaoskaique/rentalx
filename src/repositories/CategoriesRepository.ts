import { v4 as uuidV4 } from "uuid";

import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      id: uuidV4(),
      created_at: new Date(),
    });

    this.categories.push(category);
  }
}

export { CategoriesRepository };

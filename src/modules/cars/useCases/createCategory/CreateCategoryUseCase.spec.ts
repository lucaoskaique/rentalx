import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Criar Categoria", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Shoud be able to create a new Category", async () => {
    const category = {
      name: "Categoria Teste",
      description: "Categoria de teste",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const cateogryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(cateogryCreated).toHaveProperty("id");
    expect(cateogryCreated).toHaveProperty("name");
    expect(cateogryCreated).toHaveProperty("description");
  });

  it("Shoud be able to create a new Category with same name", async () => {
    expect(async () => {
      const category = {
        name: "Categoria Teste",
        description: "Categoria de teste",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

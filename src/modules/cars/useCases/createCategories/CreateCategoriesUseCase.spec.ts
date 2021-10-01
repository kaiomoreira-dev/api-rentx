import { CreateCategoryInMemory } from "@modules/cars/repositories/in-memory/CreateCategoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoriesUseCase } from "./CreateCategoriesUseCase";

let createCategoryInMemory: CreateCategoryInMemory;
let createCategoryUseCase: CreateCategoriesUseCase;

describe("Create a new Category", () => {
  beforeEach(() => {
    createCategoryInMemory = new CreateCategoryInMemory();
    createCategoryUseCase = new CreateCategoriesUseCase(createCategoryInMemory);
  });

  it("should be ale create a new Category", async () => {
    const category = {
      name: "Category Test",
      description: "Created a new category test.",
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await createCategoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should be ale create not a new Category with name exists ", async () => {
    await createCategoryUseCase.execute({
      name: "Category Test",
      description: "Created a new category test.",
    });

    await expect(
      createCategoryUseCase.execute({
        name: "Category Test",
        description: "Created a new category test.",
      })
    ).rejects.toEqual(new AppError("Category Already exist!"));
  });
});

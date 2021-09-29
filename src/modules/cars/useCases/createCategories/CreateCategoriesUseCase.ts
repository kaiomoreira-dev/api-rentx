import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { AppError } from "../../../../../shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const checkNameCategoryExists = await this.categoriesRepository.findByName(
      name
    );

    if (checkNameCategoryExists) {
      throw new AppError("Category Already exist!");
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoriesUseCase };

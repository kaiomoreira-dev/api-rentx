import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private listCategoriesRepository: ICategoriesRepository
  ) {}
  async execute(): Promise<Category[]> {
    const allCategories = await this.listCategoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoryUseCase };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async hundle(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);

    const allCategories = await listCategoryUseCase.execute();

    return response.json(allCategories);
  }
}

export { ListCategoriesController };

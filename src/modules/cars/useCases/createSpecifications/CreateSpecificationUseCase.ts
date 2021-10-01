import { inject, injectable } from "tsyringe";

import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<Specifications> {
    const checkNameSpecificationExists =
      await this.specificationsRepository.findByName(name);

    if (checkNameSpecificationExists) {
      throw new AppError("Specification Already exist!");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };

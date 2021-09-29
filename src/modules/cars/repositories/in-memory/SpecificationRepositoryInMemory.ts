import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";

import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specifications[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specifications> {
    const specifications = new Specifications();

    Object.assign(specifications, {
      name,
      description,
    });

    this.specifications.push(specifications);

    return specifications;
  }
  async findByName(name: string): Promise<Specifications> {
    const specifications = this.specifications.find(
      (specifications) => specifications.name === name
    );

    return specifications;
  }
  async findByIds(ids: string[]): Promise<Specifications[]> {
    const allSpecifications = this.specifications.filter((specifications) =>
      ids.includes(specifications.id)
    );

    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };

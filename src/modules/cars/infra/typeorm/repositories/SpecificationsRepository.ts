import { getRepository, Repository } from "typeorm";

import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

import { Specifications } from "../entities/Specifications";

class SpecificationsRepository implements ISpecificationRepository {
    private repository: Repository<Specifications>;

    constructor() {
        this.repository = getRepository(Specifications);
    }
    async findByIds(ids: string[]): Promise<Specifications[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specifications> {
        const specifications = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specifications);

        return specifications;
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };

import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}
interface ISpecificationRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specifications>;
  findByName(name: string): Promise<Specifications>;
  findByIds(ids: string[]): Promise<Specifications[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };

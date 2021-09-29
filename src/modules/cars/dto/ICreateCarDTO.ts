import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  fine_amount: number;
  license_plate: string;
  brand: string;
  category_id: string;
  specifications?: Specifications[];
  id?: string;
}

export { ICreateCarDTO };

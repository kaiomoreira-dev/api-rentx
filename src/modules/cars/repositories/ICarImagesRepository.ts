import { CarImages } from "../infra/typeorm/entities/CarImages";

interface ICarImagesDTO {
  id?: string;
  car_id: string;
  image_name: string;
}
interface ICarImagesRepository {
  create(data: ICarImagesDTO): Promise<CarImages>;
  findImages(image_name: string): Promise<CarImages>;
}

export { ICarImagesRepository, ICarImagesDTO };

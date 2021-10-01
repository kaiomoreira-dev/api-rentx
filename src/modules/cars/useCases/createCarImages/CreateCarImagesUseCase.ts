import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  id?: string;
  car_id: string;
  image_name: string[];
}

@injectable()
class CreateCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("LocalStorageProvider")
    private localStorageProvider: IStorageProvider
  ) {}
  async execute({ car_id, image_name }: IRequest): Promise<void> {
    image_name.map(async (image) => {
      await this.carImagesRepository.create({
        car_id,
        image_name: image,
      });
      await this.localStorageProvider.save(image, "carImages");
    });
  }
}

export { CreateCarImagesUseCase };

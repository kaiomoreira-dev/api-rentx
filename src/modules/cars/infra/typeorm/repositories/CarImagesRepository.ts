import { Repository } from "typeorm";

import {
    ICarImagesDTO,
    ICarImagesRepository,
} from "@modules/cars/repositories/ICarImagesRepository";
import dataSource from "@shared/infra/typeorm";

import { CarImages } from "../entities/CarImages";

class CarImagesRepository implements ICarImagesRepository {
    private repository: Repository<CarImages>;

    constructor() {
        this.repository = dataSource.getRepository(CarImages);
    }
    async findImages(image_name: string): Promise<CarImages> {
        const image = await this.repository.findOneBy({ image_name });

        return image;
    }

    async create({
        id,
        car_id,
        image_name,
    }: ICarImagesDTO): Promise<CarImages> {
        const carImages = this.repository.create({
            id,
            car_id,
            image_name,
        });

        await this.repository.save(carImages);

        return carImages;
    }
}

export { CarImagesRepository };

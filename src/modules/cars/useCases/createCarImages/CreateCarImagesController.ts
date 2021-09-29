import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarImagesUseCase } from "./CreateCarImagesUseCase";

interface IFiles {
  filename: string;
}

class CreateCarImagesController {
  async hundle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    // tipando files do tipo Files[] para pegar o atributo filanema que criamos
    // e colocar o nome do arquivo dentro
    const images = request.files as IFiles[];

    // através do mao acessamos o arquivo para pegar o filename.
    const image_name = images.map((file) => file.filename);
    const createCarImagesUseCase = container.resolve(CreateCarImagesUseCase);

    await createCarImagesUseCase.execute({
      car_id: id,
      image_name,
    });

    return response.status(200).send();
  }
}

export { CreateCarImagesController };

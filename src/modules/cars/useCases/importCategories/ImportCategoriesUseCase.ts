import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      // criar stream para pegar em partes o arquivo utilizando fs.1
      // passe o caminho
      const stream = fs.createReadStream(file.path);
      // utilize o csv parse para receber o arquivo lido
      const parseFile = csvParse();
      // utilize o o pipe no stream recebendo o arquivo csv
      stream.pipe(parseFile);
      // crie o on para ler as linhas do arquivo
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    // fazer um map em categories
    categories.map(async (category) => {
      // destruturar name e description de category map
      const { name, description } = category;
      // validar name se ja existe em category
      const checkCategoryExists = await this.categoriesRepository.findByName(
        name
      );
      // senao existir criamos nova category passando name e description
      if (!checkCategoryExists) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoriesUseCase };

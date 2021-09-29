import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { IStorageProvider } from "../../../../../shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_fileName: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("LocalStorageProvider")
    private localStorageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_fileName }: IRequest): Promise<void> {
    // buscar user pelo id
    const user = await this.userRepository.findById(user_id);

    // console.log(user);
    // se for verdadeiro aplicamos a condição
    if (user.avatar) {
      console.log(user.avatar);
      await this.localStorageProvider.delete(user.avatar, "avatar");
    }
    await this.localStorageProvider.save(avatar_fileName, "avatar");

    // adicionar a avatar_fileName em user.avatar
    user.avatar = avatar_fileName;
    // cria user no banco
    await this.userRepository.create(user);
  }
}

export { UpdateUserUseCase };

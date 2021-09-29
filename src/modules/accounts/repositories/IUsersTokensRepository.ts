import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UsersTokens>;
  findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;
  deleteRefreshToken(id: string): Promise<void>;
  findUserByRefreshToken(refresh_token: string): Promise<UsersTokens>;
}

export { IUsersTokensRepository };

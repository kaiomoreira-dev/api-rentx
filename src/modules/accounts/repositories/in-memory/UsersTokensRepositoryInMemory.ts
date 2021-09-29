import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UsersTokens[] = [];

  async create({
    refresh_token,
    expire_date,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      refresh_token,
      expire_date,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );

    return userToken;
  }
  async deleteRefreshToken(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.user_id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findUserByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };

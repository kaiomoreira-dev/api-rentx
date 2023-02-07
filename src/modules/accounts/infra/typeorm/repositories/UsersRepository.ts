import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import dataSource from "@shared/infra/typeorm";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = dataSource.getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const userId = await this.repository.findOneBy({ id });

        return userId;
    }
    findByEmail(email: string): Promise<User> {
        const findEmailUserExist = this.repository.findOneBy({ email });

        return findEmailUserExist;
    }
    async create({
        name,
        password,
        email,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);

        return user;
    }
}

export { UsersRepository };

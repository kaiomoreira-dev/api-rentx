// eslint-disable-next-line import/no-extraneous-dependencies
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImages } from "@modules/cars/infra/typeorm/entities/CarImages";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";

import { CreateCategories1620579795729 } from "./migrations/1620579795729-CreateCategories";
import { CreateSpecifications1621785838572 } from "./migrations/1621785838572-CreateSpecifications";
import { CreateUsers1621875374603 } from "./migrations/1621875374603-CreateUsers";
import { AlterUserDeleteUsername1622233372378 } from "./migrations/1622233372378-AlterUserDeleteUsername";
import { AlterUserAddAvatar1622644295560 } from "./migrations/1622644295560-AlterUserAddAvatar";
import { CreateCars1625251349603 } from "./migrations/1625251349603-CreateCars";
import { CreateSpecificationsCars1626808711144 } from "./migrations/1626808711144-CreateSpecificationsCars";
import { CreateCarImages1627314088276 } from "./migrations/1627314088276-CreateCarImages";
import { CreateUsersTokens1629494906724 } from "./migrations/1629495535368-CreateUsersTokens";
import { CreateRentals1675777233336 } from "./migrations/1675777233336-CreateRentals";
import { AlterRentalsAddStatus1675777382255 } from "./migrations/1675777382255-AlterRentalsAddStatus";

const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "docker",
    password: "d2d71c6cde20a9efa785adfb81965d2eb2e860b2",
    database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",

    // importar entidades ex: [Recipes]
    entities: [
        Category,
        Specifications,
        User,
        Car,
        CarImages,
        UsersTokens,
        Rentals,
    ],
    // importar migrations ex: [CreateRecipes102348998]
    migrations: [
        CreateCategories1620579795729,
        CreateSpecifications1621785838572,
        CreateUsers1621875374603,
        AlterUserDeleteUsername1622233372378,
        AlterUserAddAvatar1622644295560,
        CreateCars1625251349603,
        CreateSpecificationsCars1626808711144,
        CreateCarImages1627314088276,
        CreateRentals1675777233336,
        CreateUsersTokens1629494906724,
        AlterRentalsAddStatus1675777382255,
    ],
});

export function createConnection(host = "localhost"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}

export default dataSource;

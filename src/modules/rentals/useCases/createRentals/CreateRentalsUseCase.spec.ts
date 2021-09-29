import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { DayjsDateProvider } from "../../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../../shared/errors/AppError";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalsUseCase: CreateRentalsUseCase;

let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a new rentals", () => {
    const add24HoursForDate = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();

        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();

        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a rentals", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Z",
            brand: "Nissan",
            category_id: "12345",
            daily_rate: 800,
            description: "Nismo Z branco",
            fine_amount: 740,
            license_plate: "AQS-12DQ",
        });

        const rentals = await createRentalsUseCase.execute({
            car_id: car.id,
            user_id: "user1_teste",
            expected_return_date: add24HoursForDate,
        });

        expect(rentals).toHaveProperty("id");
        expect(rentals).toHaveProperty("start_date");
    });

    it("should be able to not create a rentals for a car exists", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "car_test",
            user_id: "3434",
            expected_return_date: add24HoursForDate,
        });

        await expect(
            createRentalsUseCase.execute({
                car_id: "car_test",
                user_id: "3535",
                expected_return_date: add24HoursForDate,
            })
        ).rejects.toEqual(new AppError("Car already exists for a rentals"));
    });

    it("should be able to not create a rentals for a user exists", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "12",
            expected_return_date: add24HoursForDate,
            user_id: "user_test",
        });

        await expect(
            createRentalsUseCase.execute({
                user_id: "user_test",
                expected_return_date: add24HoursForDate,
                car_id: "13",
            })
        ).rejects.toEqual(new AppError("User already exists for a rentals"));
    });

    it("should be able to not create a rentals for minmum 24hours", async () => {
        await expect(
            createRentalsUseCase.execute({
                car_id: "54",
                user_id: "67",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time"));
    });
});

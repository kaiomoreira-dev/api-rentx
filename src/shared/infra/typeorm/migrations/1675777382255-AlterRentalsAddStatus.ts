import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRentalsAddStatus1675777382255 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "rentals",
            new TableColumn({
                name: "status",
                type: "boolean",
                default: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("rentals", "status");
    }
}

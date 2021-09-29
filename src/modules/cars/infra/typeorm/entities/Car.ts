import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "./Category";
import { Specifications } from "./Specifications";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    available: boolean;

    @Column()
    daily_rate: number;

    @Column()
    fine_amount: number;

    @Column()
    license_plate: string;

    @Column()
    brand: string;

    // Relacionamento Muitos para Um
    @ManyToOne(() => Category)
    // Referencia da coluna da tabela estrangeira
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToMany(() => Specifications)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }],
    })
    specifications: Specifications[];

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
            this.available = true;
        }
    }
}

export { Car };

import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create a Categories controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    connection.query(
      `
        INSERT INTO users(id, name, password, email, driver_license, "isAdmin", created_at )
        values('${id}', 'kaio', '${password}', 'kaio-rentx@rentx.com', 'XXX-XXX', true, 'now()')
        `
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "kaio-rentx@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "category_name_supert_test",
        description: "category_description_supert_test",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    const response = await request(app).get("/categories");

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("category_name_supert_test");
  });
});

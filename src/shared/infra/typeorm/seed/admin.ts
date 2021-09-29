import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidv4();
    const password = await hash("admin", 8);

    connection.query(
        `
        INSERT INTO users(id, name, password, email, driver_license, "isAdmin", created_at )
        values('${id}', 'kaio', '${password}', 'kaio-rentx@rentx.com', 'XXX-XXX', true, 'now()')
        `
    );
}

create().then(() => {
    console.log("User created successfully");
});

const request = require("supertest");
const db = require("../api/models");
const server = require("../api/server");

/**
 *  Testing auth endpoints
 */

describe("/auth/", function () {
    describe("POST /auth/signup", function () {
        const thisDb = db;
        beforeAll(async () => {
            console.log = () => {};

            // init db
            await thisDb.sequelize.sync({ force: true }).then(async () => {
                await db.Role.bulkCreate(
                    db.ROLES.map((name, id) => ({
                        id,
                        name,
                    }))
                );
            });
        });

        it("should return a status HTTP 200 and respond with json", (done) => {
            return request(server)
                .post("/api/auth/signup")
                .send({
                    username: "juan",
                    email: "juanhola@gmail.com",
                    password: "pedro",
                    roles: ["admin"],
                })
                .expect("Content-Type", /json/)
                .expect(200, done);
        });

        it("should return a status HTTP 500 Bad Request with user incorrent", (done) => {
            return request(server)
                .post("/api/auth/signup")
                .send({
                    username: "admin",
                    email: "juan@gmail.com",
                })
                .expect("Content-Type", /json/)
                .expect(500, done);
        });

        afterAll(async () => {
            // Cerrar conexion a la DB
            await thisDb.sequelize.close();
            //Reiniciar console.log
            delete console.log;
        });
    });
});

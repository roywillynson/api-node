const app = require("./server");
const db = require("./models");

// variables de entorno
const isProduction = process.env.NODE_ENV === "production";

// Crear base de datos
async function initialize() {
    if (!isProduction) {
        // Forzar en development and test mode
        await db.sequelize.sync({ force: true }).then(async () => {
            console.log("Development: borrar y volver a crear BD");
            //Crear los roles
            await db.Role.bulkCreate(
                db.ROLES.map((name, id) => ({
                    id,
                    name,
                }))
            );
        });
    } else {
        // No activar forzar en production mode
        await db.sequelize.sync().then(() => {
            console.log("Production: Base de datos");
        });
    }

    // Escuchando
    app.listen(app.get("port"), () =>
        console.log(`Server is running on port ${app.get("port")}.`)
    );
}

// iniciar
initialize();

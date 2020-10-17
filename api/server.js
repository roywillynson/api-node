const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const { errors } = require("./middlewares");

// Configurar express
const app = express();
app.set("port", process.env.PORT || 3000);

// Middlewares
// Logger : Muestra informacion de las peticiones http en log
if (process.env.NODE_ENV === "development") app.use(logger("dev"));
// CORS options
const corsOptions = {
    origin: "http://localhost:" + app.get("port"),
};
// Habilitar CORS - CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions));
// Convertir parametros del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Helmet - proteccion de la api de vulnerabiblidades de la web
app.use(helmet());

// Rutas
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/post.routes")(app);

//Middlewares de errores
app.use(errors.error404);
app.use(errors.errorHandler); //Error handler debe ir al final

// Exportar app
module.exports = app;

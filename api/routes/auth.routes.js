const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

// Rutas de Autenticacion
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // POST - Registrar nuevo usuario en el sistema
    app.post(
        "/api/auth/signup",
        [verifySignUp.verifyIfExistUser, verifySignUp.verifyRolesExisted],
        controller.signUp
    );

    // POST - Ingresar usuario existente
    app.post("/api/auth/signin", controller.signIn);
};

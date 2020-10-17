const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

// Rutas de Autenticacion
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use(authJwt.verifyToken); //Validacion de token

    // GET - Obtiene todos los posts
    app.get("/api/posts", controller.getPosts);

    // POST - Crear un post
    app.post("/api/posts", authJwt.isAdminOrPoster, controller.createPost);

    // GET - Obtiene posts segun el id
    app.get("/api/posts/:id", controller.getPostById);

    // PUT - Modificar un post
    app.put("/api/posts/:id", authJwt.isAdminOrPoster, controller.updatePost);

    // DELETE - Borrar un post
    app.delete(
        "/api/posts/:id",
        authJwt.isAdminOrPoster,
        controller.deletePost
    );
};

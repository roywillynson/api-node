const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/test/all', controller.allAccess);

  app.use(authJwt.verifyToken); //Validacion de token

  app.get('/api/test/user', controller.userBoard);

  app.get('/api/test/poster', authJwt.isAdminOrPoster, controller.posterBoard);

  app.get('/api/test/admin', authJwt.isAdmin, controller.adminBoard);

  /************************
   * Por filtro
   ************************/

  // GET - Obtener post de un usuario
  app.get('/api/users/:id/posts', controller.filterPostsByUserId);
};

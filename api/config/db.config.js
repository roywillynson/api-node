//Configuracion del ORM
module.exports = {
  DB: 'bolsa_de_empleos',
  HOST: 'localhost',
  PORT: 3308,
  USER: 'root',
  PASSWORD: '',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

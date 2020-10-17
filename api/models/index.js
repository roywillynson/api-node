const Sequelize = require("sequelize");

//Importar configucion de sequilize
const {
    DB,
    HOST,
    PORT,
    PASSWORD,
    USER,
    dialect,
    pool,
} = require("../config/db.config");

//Configurar sequelize
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect,
    pool,
    logging: false, //Evitar que sequelize escriba en consola
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Traer modelos
db.User = require("./user.model")(sequelize, Sequelize);
db.Role = require("./role.model")(sequelize, Sequelize);
db.Post = require("./post.model")(sequelize, Sequelize);

// Crear relacion de muchos a muchos de Role y User
db.Role.belongsToMany(db.User, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id",
    timestamps: false,
});

db.User.belongsToMany(db.Role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id",
    timestamps: false,
});

// Crear relacion de uno a muchos de User y Post
db.User.hasMany(db.Post, {
    foreignKey: "user_id",
    timestamps: false,
});

db.Post.belongsTo(db.User, {
    foreignKey: "user_id",
    timestamps: false,
});

//Roles
db.ROLES = ["admin", "user", "poster"];

module.exports = db;

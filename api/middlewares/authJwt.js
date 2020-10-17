const { verify: verifyJwt } = require("jsonwebtoken");
const config = require("../config/auth.config");
const { User } = require("../models");

// Validar Token
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    //ver si el token existe
    if (!token) {
        return res.status(403).json({ mensaje: "Token no sumistrado" });
    }

    verifyJwt(token, config.secret, (error, decoded) => {
        if (error) {
            return res.status(401).json({ mensaje: "No esta Autorizado!!" });
        }

        req.userId = decoded.id;
        next();
    });
};

// Verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
    // Obtener usuario
    const user = await User.findByPk(req.userId);

    if (!user) {
        return res
            .status(403)
            .json({ mensaje: "Token no valido, porque el usuario no existe" });
    }

    // Obtener Roles
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

    // Si no es admin
    res.status(403).json({
        mensaje: "Usted requiere permiso de administrador",
    });
    return;
};

//Verificar si es poster
const isPoster = async (req, res, next) => {
    // Obtener usuario
    const user = await User.findByPk(req.userId);

    if (!user) {
        return res
            .status(403)
            .json({ mensaje: "Token no valido, porque el usuario no existe" });
    }

    // Obtener Roles
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "poster") {
            next();
            return;
        }
    }

    // Si no es poster
    res.status(403).json({ mensaje: "Usted requiere permiso de poster" });
    return;
};

// Verificar si el usuario es administrador o poster
const isAdminOrPoster = async (req, res, next) => {
    // Obtener usuario
    const user = await User.findByPk(req.userId);

    if (!user) {
        return res
            .status(403)
            .json({ mensaje: "Token no valido, porque el usuario no existe" });
    }

    // Obtener Roles
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }

        if (roles[i].name === "poster") {
            next();
            return;
        }
    }

    // Si no es admin
    res.status(403).json({
        mensaje: "Usted requiere permiso de administrador o poster",
    });
    return;
};

//Exportar Middlewares Authencatice with JWT
module.exports = {
    verifyToken,
    isAdmin,
    isPoster,
    isAdminOrPoster,
};

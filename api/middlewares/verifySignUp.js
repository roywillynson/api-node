const { User, ROLES } = require("../models");

// Middlewares SignUp

// Verificar si existe el usuario
const verifyIfExistUser = async (req, res, next) => {
    //Ejecutar tareas en paralelo
    const [user, email] = await Promise.all([
        User.findOne({ where: { email: req.body.email } }),
        User.findOne({ where: { username: req.body.username } }),
    ]);

    // Verficar Que el Email no exista
    if (user) {
        res.status(400).json({
            mensaje: "Fallo! Email ya esta en uso",
        });

        return;
    }

    // Verficar Que el Usuario no exista
    if (email) {
        res.status(400).json({
            mensaje: "Fallo! Username ya esta en uso",
        });

        return;
    }

    // next
    next();
};

// Verificar si Existe el Role
const verifyRolesExisted = (req, res, next) => {
    const { roles } = req.body;

    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            //Revisar tal role existe
            if (!ROLES.includes(roles[i])) {
                res.status(400).json({
                    status: "400",
                    mensaje: "Fallo! Ese role no existe: " + roles[i],
                });
                return;
            }
        }
    }

    // next
    next();
};

//Exportar MiddleWares SignUp
module.exports = {
    verifyIfExistUser,
    verifyRolesExisted,
};

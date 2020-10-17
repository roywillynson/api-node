const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth.config");

//Models
const { User, Role, Sequelize } = require("../models");

// Operador Sequelize
const Op = Sequelize.Op;

// SignUp Controller
export const signUp = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;

        //Guardar Usuario en la base de Datos
        const user = await User.create(
            {
                username,
                email,
                password: await bcrypt.hash(password, 8), //Incriptando password
            },
            { fields: ["username", "email", "password"] }
        );

        //If exisen los roles
        if (roles) {
            //roles
            const foundRoles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: roles,
                    },
                },
            });

            await user.setRoles(foundRoles);
        } else {
            //Si no se suministra los roles
            const foundRole = await Role.findOne({
                where: { name: "user" },
            });

            await user.setRoles([foundRole]);
        }

        //Se registro con exito
        res.status(200).json({
            status: 200,
            mensaje: "Usuario registrado correctamente!",
        });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

// SignIn Controller
export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Guardar Usuario en la base de Datos
        const user = await User.findOne({
            where: { username: username },
        });

        // Verificar si Usuario no existe
        if (!user) {
            return res
                .status(404)
                .json({ status: 404, mensaje: "Usuario no encontrado!" });
        }

        // Verificar contraseña
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                status: 401,
                accessToken: null,
                mensaje: "Contraseña no valida!",
            });
        }

        // Obtener Token
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400, //24 horas
        });

        const authorities = [];
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

const { User } = require("../models");

export const allAccess = (req, res) => {
    res.status(200).send("Contenido publico");
};

export const userBoard = (req, res) => {
    res.status(200).send("Contenido de usuario");
};

export const adminBoard = (req, res) => {
    res.status(200).send("Contenido de admin");
};

export const posterBoard = (req, res) => {
    res.status(200).send("Contenido de poster");
};

export const filterPostsByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 404,
                mensaje: "Id de Usuario no encontrado!",
            });
        }

        const userPosts = await user.getPosts();

        res.status(200).json({ id, posts: userPosts });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

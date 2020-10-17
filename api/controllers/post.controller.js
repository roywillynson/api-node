//Models
const { Post, User } = require("../models");

// Obtiene todos los Posts de la DB
export const getPosts = async (req, res) => {
    try {
        const allPosts = await Post.findAll();

        res.status(200).json(allPosts || []);
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

// Obtiene Post filtrado por id de la BD
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const foundPost = await Post.findOne({
            where: { id },
            include: User,
        });

        res.status(200).json(foundPost || {});
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

// Crear nuevo Post de la DB
export const createPost = async (req, res) => {
    try {
        await Post.create(req.body);

        res.status(201).send({
            status: 201,
            mensaje: "Post fue creado correctamente!!",
        });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

// Borrar Post de la DB
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Post.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({
                status: 404,
                mensaje: "Id de Post no encontrado!",
            });
        }

        res.status(200).json({
            status: 200,
            mensaje: `Post ${id}  fue borrado correctamente!!`,
        });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

// Actualizar Post de la BD
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const newPost = req.body;

        const [updated] = await Post.update(newPost, {
            where: { id },
        });

        if (!updated) {
            return res.status(404).json({
                status: 404,
                mensaje: "Id de Usuario no encontrado!",
            });
        }

        res.status(200).json({
            status: 200,
            mensaje: `Post ${id} fue actualizado correctamente!!`,
        });
    } catch (error) {
        res.status(500).json({ status: 500, mensaje: error.message });
    }
};

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
        "posts",
        {
            company: {
                type: Sequelize.STRING,
            },
            tipo: {
                type: Sequelize.STRING,
            },
            logo: {
                type: Sequelize.STRING,
            },
            url: {
                type: Sequelize.STRING,
            },
            ubicacion: {
                type: Sequelize.STRING,
            },
            categoria: {
                type: Sequelize.STRING,
            },
        },
        { timestamps: false }
    );

    return Post;
};

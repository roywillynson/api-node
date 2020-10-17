// Capturar error 404
const error404 = (req, res, next) => {
    const error = new Error("No encontrado");
    error.status = 404;
    next(error);
};

//Error Handler
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        error: error.status || 500,
        mensaje: error.message,
    });
};

module.exports = {
    error404,
    errorHandler,
};

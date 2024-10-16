
// Respuesta exitosa
exports.success = function(req, res, status, message) {
    res.status(status).json({
        error: false,
        status: status,
        msg: message,
        body: res.body
    });
};

// Respuesta con error
exports.error = function(req, res, status, message) {
    res.status(status).json({
        error: true,
        status: status,
        msg: message,
        body: req.body
    });
};

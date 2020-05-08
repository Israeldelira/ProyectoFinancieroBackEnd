const jwt = require('jsonwebtoken');

let verificatoken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'No tienes los permisos para navegar',
                ok: false,
                err
            });
        }
        // if (req.method != 'GET') {
        //     if (decoded.role == 'admin') next();
        //     else res.status(403).send({ message: 'No tienes los permisos suficientes para estar aquí...' });
        // } else {
        req.usuario = decoded.usuario;
        next();

    });
};

module.exports = {
    verificatoken
};
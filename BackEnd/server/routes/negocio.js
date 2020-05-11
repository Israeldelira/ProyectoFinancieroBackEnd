const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/token');
const Negocio = require('../models/negocio');
const app = express();

app.get('/negocio', [verificatoken], (req, res) => {
    Negocio.find({})
        .exec((err, negocio) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: negocio.length,
                negocio
            })
        });
});

app.post('/negocio', [verificatoken], (req, res) => {
    let body = req.body;

    let negocio = new Negocio({
        nombre: body.nombre,
        descripcion: body.descripcion,
        usuario: body.usuario
    });
    negocio.save((err, negocioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            negocioDB
        });
    });
});

app.put('/negocio', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'usuario', 'estado']);

    Negocio.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, negocioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            negocioDB
        });
    });
});

app.delete('/negocio', [verificatoken], (req, res) => {
    let id = req.body.id;
    Negocio.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'negocio no encontrado'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });

});
module.exports = app;
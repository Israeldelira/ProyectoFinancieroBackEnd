const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/token');
const Gasto = require('../models/gasto');
const app = express();

app.get('/gasto', [verificatoken], (req, res) => {
    Gasto.find({})
        .exec((err, gasto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: gasto.length,
                gasto
            })
        });
});

app.post('/gasto', [verificatoken], (req, res) => {
    let body = req.body;

    let gasto = new Gasto({
        nombre: body.nombre,
        tipoGasto: body.tipoGasto,
        descripcion: body.descripcion,
        fechaSalida: body.fechaSalida,
        cantidad: body.cantidad,
        notas: body.notas,
        usuario: body.usuario
    });
    gasto.save((err, gastoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            gastoDB
        });
    });
});

app.put('/gasto', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['nombre', 'tipoGasto', 'descripcion', 'fechaEntrada, fechaSalida, cantidad', ]);

    Gasto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, gastoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            gastoDB
        });
    });
});

app.delete('/gasto', [verificatoken], (req, res) => {
    let id = req.body.id;
    Gasto.deleteOne({ _id: id }, (err, resp) => {
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
                    msg: 'gasto no encontrado'
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
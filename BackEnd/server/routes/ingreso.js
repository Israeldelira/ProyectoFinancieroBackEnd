const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/token');
const Ingreso = require('../models/ingreso');
const app = express();

app.get('/ingreso', [verificatoken], (req, res) => {
    Ingreso.find({})
        .exec((err, ingreso) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: ingreso.length,
                ingreso
            })
        });
});

app.post('/ingreso', [verificatoken], (req, res) => {
    let body = req.body;

    let ingreso = new Ingreso({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fechaEntrada: body.fechaEntrada,
        fechaLimite: body.fechaLimite,
        fechaSalida: body.fechaSalida,
        cantidad: body.cantidad,
        deudor: body.deudor,
        usuario: body.usuario,
        negocio: body.negocio
    });
    ingreso.save((err, ingresoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            ingresoDB
        });
    });
});

app.put('/ingreso', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['nombre',
        'descripcion',
        'fechaEntrada',
        'fechaLimite',
        'fechaSalida',
        'cantidad',
        'deudor',
        'usuario',
        'negocio'
    ]);

    Ingreso.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, ingresoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            ingresoDB
        });
    });
});

app.delete('/ingreso', [verificatoken], (req, res) => {
    let id = req.body.id;
    Ingreso.deleteOne({ _id: id }, (err, resp) => {
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
                    msg: 'ingreso no extiste'
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
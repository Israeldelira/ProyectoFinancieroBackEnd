const express = require('express');
const app = express();

app.use(require('./usuario'));

app.use(require('./login'));
app.use(require('./gasto'));
app.use(require('./negocio'));
app.use(require('./ingreso'));
module.exports = app;
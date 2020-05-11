const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let ingresoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingresa la descripcion del ingreso']
    },
    descripcion: {
        type: String,
        required: [true, 'Ingresa la descripcion del ingreso']
    },
    fechaEntrada: {
        type: Date,
        default: Date.now
    },
    fechaLimite: {
        type: Date,
        default: Date.now
    },
    fechaSalida: {
        type: Date,

    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor ingrese la cantidad del gasto']
    },
    deudor: {
        type: String,
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'Usuario',
        required: [true, 'Porfavor ingresa el ID del usuario']
    },
    negocio: {
        type: Schema.ObjectId,
        ref: 'Negocio',
        required: [true, 'Porfavor ingresa el ID del negocio']
    }
});
//el esquema utilize el plugin
ingresoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Ingreso', ingresoSchema);
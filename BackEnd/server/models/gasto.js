const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let gastoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese el nombre del evento']
    },
    tipoGasto: {
        type: String,
        required: [true, 'Por favor ingrese el Tipo']
    },
    descripcion: {
        type: String,
        required: [true, 'Ingresa la descripcion del gasto']
    },
    fechaEntrada: {
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
    notas: {
        type: String,


    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'Usuario',
        required: [true, 'Porfavor ingresa el ID del usuario']
    }
});
//el esquema utilize el plugin
gastoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Gasto', gastoSchema);
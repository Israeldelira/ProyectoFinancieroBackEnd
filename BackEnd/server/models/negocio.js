const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let negocioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el email del usuario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, 'Por favor ingresa el  usuario']
    },
    estado: {
        type: Boolean,
        default: true
    },

});

negocioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Negocio', negocioSchema);
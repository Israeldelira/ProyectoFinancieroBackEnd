const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el email del usuario']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña del usuario']
    },
    role: {
        type: String,
        default: 'regular',
        enum: [
            'regular',
            'admin'
        ]
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },

});

usuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);
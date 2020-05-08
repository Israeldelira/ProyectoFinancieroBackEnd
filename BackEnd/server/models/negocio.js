const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
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
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
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
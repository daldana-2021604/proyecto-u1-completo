const {Schema, model} = require('mongoose');

const VentaSchema = Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
})

module.exports = model('Venta', VentaSchema);
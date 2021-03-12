
const mongoose = require( 'mongoose' );

const tareaSchema = mongoose.Schema( {
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
    } );

module.exports = mongoose.model( 'Tarea', tareaSchema );
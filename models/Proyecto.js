const mongoose = require( 'mongoose' );

const proyectoSchema = mongoose.Schema( {
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
},
    {
    timestamps: true,
    versionKey: false,
} );

module.exports = mongoose.model( 'Proyecto', proyectoSchema );
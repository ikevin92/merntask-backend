const { Schema, model } = require( 'mongoose' );

const usuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        registro: {
            type: Date,
            default: Date.now()
        }
    }, {
        timestamps: true,
        versionKey: false,
}
);

module.exports = model( 'Usario', usuarioSchema );

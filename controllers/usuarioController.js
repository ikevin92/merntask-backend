const Usuario = require( '../models/Usuario' );
const bcryptjs = require( 'bcryptjs' );
const { validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );

const crearUsuario = async ( req, res ) => {

    // revisar si hay errores (USANDO EXPRES VALIDATOR)
    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {
        return res.status( 400 ).json( { errores: errores.array() } );
    }

    // extraer email y password
    const { email, password } = req.body;

    try {

        // revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne( { email } );

        if ( usuario ) {
            return res.status( 400 ).json( { msg: 'el usuario ya exite' } );
        }

        // crear el nuevo usuario
        usuario = new Usuario( req.body );

        // hashear el password
        const salt = await bcryptjs.genSalt( 10 );
        usuario.password = await bcryptjs.hash( password, salt );

        // guardar el nuevo usuario
        await usuario.save();
        // console.log( req.body );

        // // mensaje de confirmacion
        // res.json( { msg: 'Usuario creado correctamente' } );

        // Crear y firmar el JWT
        // crear
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign( payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora (expirar)
        }, ( error, token ) => {
            if ( error ) throw error;

            // Mensaje de confirmación
            res.json( { token } );
        } );


    } catch ( error ) {
        console.log( error );
        res.status( 400 ).send( 'Hubo un error' );

    }
};

module.exports = {
    crearUsuario
};
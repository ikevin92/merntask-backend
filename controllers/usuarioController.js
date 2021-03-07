const Usuario = require( '../models/Usuario' );
const bcryptjs = require( 'bcryptjs' );



const crearUsuario = async ( req, res ) => {

    // extraer email y password
    const { email, password } = req.body;


    // console.log('desde crear usuario');
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
        console.log( req.body );

        // mensaje de confirmacion
        res.json( { msg: 'Usuario creado correctamente' } );
    } catch ( error ) {
        console.log( error );
        res.status( 400 ).send( 'Hubo un error' );

    }
};

module.exports = {
    crearUsuario
};
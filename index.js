const express = require( 'express' );
const conectarDB = require( './config/db' );

// crear servidor
const app = express();

// conectar a la base de datos
conectarDB();

// habilitar express.json (tambien se usa body parser)
app.use( express.json( { extended: true } ) );

// declaramos el puerto del app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use( '/api/usuarios', require( './routes/usuarios' ) );

// Definir pagina principal
app.get( '/', ( req, res ) => {
    res.send( 'hola mundo' );
} );


// arramcar la appp
app.listen( PORT, () => {
    console.log( `esta funcionando en el puerto ${ PORT }` );
} );
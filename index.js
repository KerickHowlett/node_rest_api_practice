import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';

// Setup API app.
const app = express();
const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/CRMdb', {
	useNewUrlParser: true,
	useUnifiedTopology: true
} );

// Parse (HTML) x-www-form-urlencoded into JSON.
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

routes( app ); // Establish API routes/URLs.

// Serving static files. 
app.use( express.static( 'assets' ) );

// Testing to see if API is listening 
app.get( '/', ( request, response ) => response.send( `Node and express server running on http://${ request.hostname + ':' + PORT }` ) );

app.listen( PORT ); // Having API always be listening... always watching... when you least expect it.
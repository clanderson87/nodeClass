import express from 'express'; //API framework
import http from 'http'; //Server Creation.
import bodyParser from 'body-parser'; //Allows request parsing
import mongoose from 'mongoose'; //ORM for MongoDB

import config from './config';
import routes from './routes';

let app = express();

app.server = http.createServer(app);

//middleware

//passport auth

//api routes v1
app.use('/v1', routes); //master route for v1 of api
app.server.listen(config.port);
console.log(`Started on port${app.server.address().port}`);

export default app;
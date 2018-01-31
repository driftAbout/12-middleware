
'use strict';
require('dotenv').config();
const server = require('./lib/server');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

server.start(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
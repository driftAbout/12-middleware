
//if(process.env.NODE_ENV !==)
require('dotenv').config();
const server = require('./lib/server');

server.start(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
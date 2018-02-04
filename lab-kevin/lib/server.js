'use strict';

const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server-module');
require('dotenv').config();

//app setup
const app = express();
const router_notes = express.Router();

debug('server - express');

//router setup
require('../route/route-note')(router_notes);
app.use(cors());
app.use('/api/v1/note', router_notes);
app.use('/+', (req, res) => errorHandler(new Error('Path error: File not found'), res));

const server = module.exports = {};
//server.isOn = false;
server.http = null;

const PORT = process.env.PORT;

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) return reject(new Error('Server Running'));
    server.http = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
    server.isOn = true;
    return resolve ();
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server is stopped'));
    server.http.close(() => {
      console.log('server is shutting down');
      server.isOn = false;
      return resolve(server);
    });
   
  });

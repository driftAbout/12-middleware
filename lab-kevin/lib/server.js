'use strict';

const express = require('express');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server-module');

//app setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);
debug('server - express');

//router setup
require('../route/route-note')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path error: File not found'), res));

const server = module.exports = {};
server.isOn = false;
//server controls
server.start = (PORT, cb) => {
  if (server.isOn) return new Error('Server already running');
  app.listen(PORT, cb);
};
server.stop = cb => {
  if (!server.isOn) return new Error('Server not running');
  app.close(cb);
};
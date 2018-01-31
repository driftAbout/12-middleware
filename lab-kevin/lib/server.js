'use strict';

const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server-module');

//app setup
const app = express();
const router_notes = express.Router();
app.use('/api/v1/note', router_notes);
app.use(cors);
debug('server - express');

//router setup
require('../route/route-note')(router_notes);
app.use('/*', (req, res) => errorHandler(new Error('Path error: File not found'), res));

const server = module.exports = {};
server.isOn = false;
server.http = null;

//server controls
server.start = (PORT, cb) => {
  if (server.isOn) return new Error('Server already running');
  server.http = app.listen(PORT, cb);
};
server.stop = cb => {
  if (!server.isOn) return new Error('Server not running');
  server.http.close(cb);
};
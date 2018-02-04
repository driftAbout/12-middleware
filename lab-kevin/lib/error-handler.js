'use strict';

const debug = require('debug')('http:error-handling');

module.exports = function(err, res) {

  debug('error: ', err);

  let errMsg = `${err.name}: ${err.message}`;
  let msg = errMsg.toLowerCase();
  debug('error mesg: ', msg);
 

  switch(true) {
  case  msg.includes('validation'): return res.status(400).send(errMsg);
  case  msg.includes('path error'): return res.status(404).send(errMsg);
  case  msg.includes('enoent'): return res.status(404).send(errMsg);
  default: return res.status(500).send(errMsg);  
  }
};
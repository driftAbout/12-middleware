'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage-constructor');

const storage = module.exports = {};

storage.create = function(schema, item){
  debug('item', item);
  let jsonItem = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, jsonItem)
    .then(() => item);
};

storage.fetchOne = function (schema, item_id) {
  debug('read path', `${__dirname}/../data/${schema}/${item_id}.json`);
  return fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json`)
    .then(data => data.toString());
};

storage.fetchAll = function(schema) {
  debug('fetchall');
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then(data => data.map(val => val.split('.')[0]));
};

storage.update = function (schema, item_id, body) {

  return fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json`)
    .then(data =>{
      let item = JSON.parse(data.toString());
      let {subject, comment} = body;
      item.subject = subject;
      item.comment = comment;
      return JSON.stringify(item);
    })
    .then(item => {
      return fs.writeFileProm(`${__dirname}/../data/${schema}/${item_id}.json`, item);
    });
};

storage.whack = function(schema, item_id) {
  debug('delete schema', schema, 'item_id', item_id);
  debug('delete path', `${__dirname}/../data/${schema}/${item_id}.json`);
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${item_id}.json`);
};




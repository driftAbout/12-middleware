'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};
let basePath = `${__dirname}/../data`;

let writeFile = (schema, item_id, json) => fs.writeFileProm(`${basePath}/${schema}/${item_id}.json`, json);
let readFile = (schema, item_id) => fs.readFileProm(`${basePath}/${schema}/${item_id}.json`);

storage.create = (schema, item) => writeFile(schema, item.id, JSON.stringify(item));
storage.fetchOne = (schema, item_id) => readFile(schema, item_id);
storage.fetchAll = (schema) => fs.readdirProm(`${basePath}/${schema}`);
storage.update = (schema, item_id, item) => writeFile(schema, item_id, JSON.stringify(item));    
storage.whack = (schema, item_id) => fs.unlinkProm(`${basePath}/${schema}/${item_id}.json`);


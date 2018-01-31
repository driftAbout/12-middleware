'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');

module.exports = function(subject, comment) {
  return new Promise( (resolve, reject) =>{
    if (!subject || !comment) return reject(new Error('Validation error: Cannot create note, subject or comment missing'));
    this.subject = subject;
    this.comment = comment;
    this.id = uuid();
    debug(`#Note: ${this}`);
    return resolve(this);
  });
};
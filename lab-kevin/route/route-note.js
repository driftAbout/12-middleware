'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');


module.exports = function(router) {
  debug('routes');
  debug('routes2');
  
  router.post('/note', bodyParser, (req, res) => {
    debug('route post');
    new Note(req.body.subject, req.body.comment)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))
      .catch( err => errorHandler(err, res));
  });

  router.get('/note/:id', (req, res) =>{
    debug('route fetchone');
    let note_id = req.params.id;
    storage.fetchOne('note', note_id)
      .then(data => res.status(200).json(JSON.parse(data)))
      .catch( err => errorHandler(err, res));
  });

  router.get('/note', (req, res) =>{
    debug('route fetchall');
    storage.fetchAll('note')
      .then(data => res.status(200).json(data))
      .catch( err => errorHandler(err, res));
  });

  router.put('/note/:id', bodyParser, (req, res) =>{
    debug('route update id', req.params.id);
    storage.update('note', req.params.id, req.body)
      .then(() => res.status(204).end())
      .catch( err => errorHandler(err, res));
  });

  router.delete('/note/:id', (req, res) => {
    debug('delete req', req.params.id);
    debug('delete req.body', req.body);
    storage.whack('note', req.params.id)
      .then(() => res.sendStatus(204))
      .catch( err => errorHandler(err, res));
  });

};
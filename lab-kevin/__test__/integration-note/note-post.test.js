'use strict';

const debug = require('debug')('http:server-test');
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST Integration', function() {
  beforeAll(() => server.start(process.env.PORT), () => console.log(process.env.PORT));
  afterAll(() => server.stop()); 
  
  describe('Valid requests', () => {

    beforeAll(()=> {
      this.postNote = {subject: 'hello', comment: 'Funkn-A'};
      return  superagent.post(':4000/api/v1/note')
        .send(this.postNote)
        .then( res => this.resPost = res)
        .catch(err => {
          return debug('superagent error ', err);
        });
    });

    beforeAll(()=> {
      return  superagent.get(`:4000/api/v1/note/${this.resPost.body.id}`)
        .then(note => this.getNote = note);
    });

    describe('POST /api/v1/note => create', () => {

      it('should post and create a new record', () => {
        debug('this.resPost.body', this.resPost.body);
        expect(this.resPost.body.subject).toEqual('hello');
        expect(this.resPost.body.comment).toEqual('Funkn-A');
      });

      it('should post with 201', () => {
        expect(this.resPost.status).toEqual(201);
      });

      it('should  have id on the response body', () => {
        expect(this.resPost.body).toHaveProperty('id');
      });

      it('should have subject that matches the subject sent on the rew=quest body', () => {
        expect(this.getNote.body.subject).toEqual('hello');
      });

    });

  });

  describe('Inalid requests', () => {

    it('should return a 400 for a post with bad data route', () => {
      return  superagent.post(':4000/api/v1/note')
        .send({subject: '', comment: 'Funkn-A'})
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });

    it('should return a 404 for a bad post route', ()=> {
      return  superagent.post(':4000/api/v1/no')
        .send({subject: 'hello', comment: 'Funkn-A'})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });

});
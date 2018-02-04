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
      return  superagent.post(':4000/api/v1/note')
        .send({subject: 'hello', comment: 'Funkn-A'})
        .then( res => {
          this.resPost = res;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
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
      it('should should have id on the response body', () => {
        expect(this.resPost.body).toHaveProperty('id');
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
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

    beforeAll(()=> {
      return  superagent.get(`:4000/api/v1/note${this.resPost.body.id}`)
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

});
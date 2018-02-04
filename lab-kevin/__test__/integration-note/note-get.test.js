'use strict';

const debug = require('debug')('http:server-test');
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET Integration', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  
  describe('Valid requests', () => {

    beforeAll(()=> {
      return  superagent.post(':4000/api/v1/note')
        .send({subject: 'hello', comment: 'Funkn-A'})
        .then( res => {
          this.resPost = res;
          return;
        })
        .catch(err => {
          debug('superagent error ', err);
        });
    });

    describe('GET /api/v1/note/someid => fetchOne', () => {
    
      beforeAll(() => {
        debug('this.resPost.body.id', this.resPost.body.id);
        return superagent.get(`:4000/api/v1/note/${this.resPost.body.id}`)
          .then(res => this.getOne = res);       
      });
  
      it('should return json data', () => {
        debug('this.getOne.body', this.getOne.body);
        expect(this.getOne.body.id).toEqual(this.resPost.body.id);
      });
      it('should return status code 200', () => {
        expect(this.getOne.status).toEqual(200);
      });
    });

    describe('GET /api/v1/note => fetchAll', () => {
      
      beforeAll(() => {
        return superagent.get(':4000/api/v1/note')
          .then(res => this.getAll = res);       
      });

      it('should contain id of post in array', () => {
        debug('this.getAll.body', Array.isArray(this.getAll.body));
        debug('this.getAll.text', this.getAll.text);
        expect(this.getAll.body).toEqual(expect.arrayContaining([this.resPost.body.id]));
        
      });
      it('should return status code 200', () => {
        expect(this.getAll.status).toEqual(200);
      });
    });

    describe('Inalid requests', () => {

      it('should return a 404 for a missing route', () => {
        return  superagent.get(':4000/api/v1/not')
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });

      it('should return a 404 for a bad id', ()=> {
        return  superagent.get(':4000/api/v1/note/4')
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});



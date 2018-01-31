'use strict';

const debug = require('debug')('http:server-test');
const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Integration', function() {
  beforeAll(() => server.start(4000), () => console.log(4000));
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

    describe.only('POST /api/v1/note => create', () => {
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
        debug('this.getAll.body', this.getAll.body);
        debug('this.getAll.text', this.getAll.text);
        expect(JSON.parse(this.getAll.text)).toEqual(expect.arrayContaining([this.resPost.body.id]));
      });
      it('should return status code 200', () => {
        expect(this.getAll.status).toEqual(200);
      });
    });

    describe('PUT /api/v1/note/someid => update', () => {
      
      beforeAll(() => {
        return superagent.put(`:4000/api/v1/note/${this.resPost.body.id}`)
          .send({subject: 'goodbye', comment: 'Funkn-B'})
          .then(res => this.put = res);       
      });
      beforeAll(() => {
        return superagent.get(`:4000/api/v1/note/${this.resPost.body.id}`)
          .then(res => this.putGet = res);       
      });

      it('should subject should be new', () => {
        debug('this.putGet.body', this.putGet.body);
        let body = JSON.parse(this.putGet.text);
        expect(body.subject).toEqual('goodbye');
      });
      it('should return status code 204', () => {
        expect(this.put.status).toEqual(204);
      });
    });

    describe('DELETE /api/v1/note/someid => whack', () => {
      
      beforeAll(() => {
        return superagent.delete(`:4000/api/v1/note/${this.resPost.body.id}`)
          .then(res => this.deleteRes = res);       
      });
      beforeAll(() => {
        return superagent.get(`:4000/api/v1/note/${this.resPost.body.id}`)
          .catch(err => this.deleteGet = err);       
      });

      it('should return status 404', () => {
        debug('this.deleteGet.body', this.deleteGet.status);
        expect(this.deleteGet.status).toEqual(404);
      });
      it('should return status code 204', () => {
        expect(this.deleteRes.status).toEqual(204);
      });
    });

  });

});
    


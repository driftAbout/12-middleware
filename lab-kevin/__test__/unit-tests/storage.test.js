'use strict';

const debug = require('debug')('http:Unit-test-storage');
const storage = require('../../lib/storage'); 
const uuid = require('uuid/v4');

describe('storage unit testing', function() {

  describe('storage.create', function() {

    this.mockItem = {subject: 'hello' , comment: 'how are you', id: uuid() };
    beforeAll(() => {
      return storage.create('note', this.mockItem);
    });
    beforeAll(() => {
      return storage.fetchOne('note', this.mockItem.id )
        .then(item => this.note = item.toString());
    });
    it('should create a new file', () => {
      debug ('note', this.note);
      expect(this.note).not.toBeNull();
    });
  });

  describe('storage.fetchOne', function() {
    this.mockItem = {subject: 'hello' , comment: 'how are you', id: uuid() };
    beforeAll(() => {
      return storage.create('note', this.mockItem);
    });

    beforeAll(() => {
      return storage.fetchOne('note', this.mockItem.id )
        .then(item => this.note = item.toString());
    });
    
    it('should create a new file', () => {
      debug('note', this.note);
      expect(this.note).not.toBeNull();
    });
  });

  describe('storage.fetchAll', function() {
   
    beforeAll(() => {
      this.mockItem = {subject: 'hello' , comment: 'how are you', id: uuid() };
      return storage.create('note', this.mockItem);
    });
    beforeAll(()=>{
      return storage.fetchAll('note')
        .then(items => this.notes = items);
    });

    it('should create a new file', () => {
      debug('notes', this.notes);
    });
  });

});
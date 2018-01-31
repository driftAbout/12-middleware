'use strict';

const Note = require('../../model/note'); 

describe('NOTE unit testing', function() {
  this.mockItem = {subject: 'this', comment: 'that'};
  new Note(this.mockItem.subject, this.mockItem.comment)
    .then(item => this.note = item);
  it('should be an object', () => {
    console.log('note',this.note);
    expect (this.note).toBeInstanceOf(Object);
  });
  it('should have a uuid', () => {
    expect (this.note.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
  it('should have a subject', () => {
    expect (this.note.subject).not.toBeNull();
  });
  it('should have a comment', () => {
    expect (this.note.comment).not.toBeNull();
  });
});
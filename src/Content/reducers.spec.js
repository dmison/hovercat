/* global describe it */
const expect = require('chai').expect;
const reducers = require('./reducers.js');
const actions = require('./actions.js');

describe('testing content reducers', () => {

  it('add simple content', ()=>{
    const content = 'some arbitrary text content';
    const actualNewState = reducers.content_reducer('', actions.addContent(content));
    const expectedNewState = 'some arbitrary text content';
    expect(actualNewState).to.equal(expectedNewState);
  });



});

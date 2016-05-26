/* global describe it */
const expect = require('chai').expect;
const {config_reducer} = require('./reducers.js');
const {
  setEditorWrap
} = require('./actions.js');

describe('testing config reducers', () => {

  it('set editor wrap to true', ()=>{
    const startingState = {};
    const expectedEndState = {'wrap': true};
    const actualNewState = config_reducer(startingState, setEditorWrap(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set editor wrap from true to false', ()=>{
    const startingState = {'wrap': true};
    const expectedEndState = {'wrap': false};
    const actualNewState = config_reducer(startingState, setEditorWrap(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set editor wrap from true to false', ()=>{
    const startingState = {'wrap': true};
    const expectedEndState = {'wrap': false};
    const actualNewState = config_reducer(startingState, setEditorWrap(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

});

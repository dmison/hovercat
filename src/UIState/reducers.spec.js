/* global describe it */
const expect = require('chai').expect;
const {ui_state_reducer} = require('./reducers.js');
const {setSaved} = require('./actions.js');
const {setEditorWrap} = require('./actions.js');

describe('testing UI State reducers', () => {

  it('set saved to false', ()=>{
    const startingState = [];
    const expectedEndState = [{'saved': false}];
    const actualNewState = ui_state_reducer(startingState, setSaved(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set saved from false to true', ()=>{
    const startingState = [{'saved': false}];
    const expectedEndState = [{'saved': true}];
    const actualNewState = ui_state_reducer(startingState, setSaved(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set editor wrap to true', ()=>{
    const startingState = [];
    const expectedEndState = [{'wrap': true}];
    const actualNewState = ui_state_reducer(startingState, setEditorWrap(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set editor wrap from true to false', ()=>{
    const startingState = [{'wrap': true}];
    const expectedEndState = [{'wrap': false}];
    const actualNewState = ui_state_reducer(startingState, setEditorWrap(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });


});

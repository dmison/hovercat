/* global describe it */
const expect = require('chai').expect;
const reducers = require('./reducers.js');
const actions = require('./actions.js');

describe('testing error reducers', () => {

  it('add yaml error', ()=>{
    const errorText = 'some arbitrary content error message';
    const sourceType = 'YAML';
    const actualNewState = reducers.error_reducer(undefined, actions.addError(errorText, sourceType));
    const expectedNewState = [
      {
        type: 'YAML',
        template: '',
        message: errorText
      }
    ];
    expect(actualNewState).to.deep.equal(expectedNewState);
  });

  it('add text template processing error', ()=>{
    const errorText = 'some arbitrary text error message';
    const sourceType = 'TEXT';
    const templateName = 'basic text email';

    const actualNewState = reducers.error_reducer(undefined, actions.addError(errorText, sourceType, templateName));
    const expectedNewState = [
      {
        type: 'TEXT',
        template: templateName,
        message: errorText
      }
    ];
    expect(actualNewState).to.deep.equal(expectedNewState);
  });

  it('add html template processing error', ()=>{
    const errorText = 'some arbitrary HTML error message';
    const sourceType = 'HTML';
    const templateName = 'basic HTML email';

    const actualNewState = reducers.error_reducer(undefined, actions.addError(errorText, sourceType, templateName));
    const expectedNewState = [
      {
        type: 'HTML',
        template: templateName,
        message: errorText
      }
    ];
    expect(actualNewState).to.deep.equal(expectedNewState);
  });

  it('add text template processing error and then clear it', ()=>{
    const errorText = 'some arbitrary text error message';
    const sourceType = 'TEXT';
    const templateName = 'basic text email';

    const startState = reducers.error_reducer(undefined, actions.addError(errorText, sourceType, templateName));
    const finalState = reducers.error_reducer(startState, actions.clearError(sourceType, templateName));
    expect(finalState).to.deep.equal([]);
  });


});

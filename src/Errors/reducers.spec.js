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

  it('add and clear yaml error', ()=>{
    const errors = [
      {
        message: 'some arbitrary content error message',
        type: 'YAML',
        template: ''
      },
      {
        message: 'some arbitrary content error message',
        type: 'HTML',
        template: 'HTML Email'
      }
    ];
    const expectedNewState = [
      {
        message: 'some arbitrary content error message',
        type: 'HTML',
        template: 'HTML Email'
      }
    ];

    const actualNewState = reducers.error_reducer(errors, actions.clearError('YAML'));
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

  it('errors of the same type and template name should overwrite', ()=>{
    const errorTextOne = 'the first arbitrary text error message';
    const errorTextTwo = 'the second arbitrary text error message';

    const sourceType = 'TEXT';
    const templateName = 'basic text email';

    const startState = reducers.error_reducer(undefined, actions.addError(errorTextOne, sourceType, templateName));
    const finalState = reducers.error_reducer(startState, actions.addError(errorTextTwo, sourceType, templateName));

    expect(finalState.length).to.equal(1);
    expect(finalState[0]).to.deep.equal({
      type: 'TEXT',
      message: 'the second arbitrary text error message',
      template: 'basic text email'
    });
  });


});

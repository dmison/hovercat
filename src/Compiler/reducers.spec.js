/* global describe it */
const expect = require('chai').expect;
const output_reducer = require('./reducers.js');
const {updateOutput} = require('./actions.js');
const {clearAnOutput} = require('./actions.js');
const {clearAllOutputs} = require('./actions.js');

describe('testing compiler reducers', function() {

  it('testing compiler updateOutput() - new output', function() {
    const id = '1234';
    const output = `## this is a testing

    And some text goes here.`;

    const expectedState = [
      {
        id: id,
        output: output
      }
    ];

    const actualState = output_reducer([], updateOutput(output, id));
    expect(actualState).to.deep.equal(expectedState);

  });

  it('testing compiler clear output for template', function() {
    const idOne = '123';
    const outputOne = `<h2>this is a testing</h2>
    <p>And some text goes here.</p>`;

    const idTwo = '456';
    const outputTwo = `## this is a testing

    And some text goes here.`;

    const startState = [
      {
        id: idOne,
        output: outputOne
      },
      {
        id: idTwo,
        output: outputTwo
      }
    ];

    const expectedEndState = [
      {
        id: idOne,
        output: outputOne
      }
    ];

    const actualEndState = output_reducer(startState, clearAnOutput(idTwo));
    expect(actualEndState).to.deep.equal(expectedEndState);
  });

  it('testing compiler clearAllOutputs()', function() {

    const startState = [
      {
        id: '1234',
        output: '## this is a testing'
      }
    ];

    const actualState = output_reducer(startState, clearAllOutputs());
    expect(actualState).to.deep.equal([]);

  });




});

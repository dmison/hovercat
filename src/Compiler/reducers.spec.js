/* global describe it */
const expect = require('chai').expect;
const output_reducer = require('./reducers.js');
const {updateOutput} = require('./actions.js');

describe('testing compiler reducers', () => {

  it('testing compiler output reducers', ()=>{

    const name = 'email - text';
    const type = 'markdown';
    const output = `## this is a testing

    And some text goes here.`;

    const expectedState = [
      {
        name: name,
        type: type,
        output: output
      }
    ];

    const actualState = output_reducer([], updateOutput(output, type, name));
    expect(actualState).to.deep.equal(expectedState);

  });

});

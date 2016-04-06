/* global describe it */
const expect = require('chai').expect;
const {compile} = require('./index.js');
const {parseYAML} = require('./index.js');


describe('test compiler package', () => {

  it('basic compile - compile()', ()=>{
    const content = {
      title: 'some title',
      text: 'some text'
    };
    const template = '{{title}} - {{text}}';

    const actualOutput = compile(content, template);
    const expectedOutput = {
      output: 'some title - some text',
      error: ''
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });


  it('fail basic compile - compile()', ()=>{
    const content = {
      title: 'some title',
      text: 'some text'
    };
    const template = '{{title - {{text}}';

    const actualOutput = compile(content, template);

    expect(actualOutput.output).to.equal('');
    expect(actualOutput.error).to.not.equal('');

  });






  it('basic YAML parse - parseYAML()', ()=>{
    const YAMLText = `title: some title
text: some text`;

    const expectedOutput = {
      data:{
        title: 'some title',
        text: 'some text'
      },
      error: ''
    };

    const actualOutput = parseYAML(YAMLText);

    expect(actualOutput).to.deep.equal(expectedOutput);
  });


});

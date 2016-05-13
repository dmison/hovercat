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
    const expectedOutput = 'some title - some text';

    compile(content, template, (err, output)=>{
      expect(err).to.be.null;
      expect(output).to.deep.equal(expectedOutput);
    });

  });


  it('fail basic compile - compile()', ()=>{
    const content = {
      title: 'some title',
      text: 'some text'
    };
    const template = '{{title - {{text}}';

    compile(content, template, (err, output)=>{
      expect(typeof err).to.equal('string');
      expect(output).to.be.null;
    });

  });


  it('basic YAML parse - parseYAML()', ()=>{
    const YAMLText = `title: some title
text: some text`;

    const expectedOutput = {
      title: 'some title',
      text: 'some text'
    };

    parseYAML(YAMLText, (err, output)=>{
      expect(output).to.deep.equal(expectedOutput);
      expect(err).to.be.null;
    });
  });


  it('full render', ()=>{
    const YAMLText = `title: some title
text: some text`;
    const template = '{{title}} - {{text}}';
    const expectedOutput = 'some title - some text';
    parseYAML(YAMLText, (err, result)=>{
      expect(err).to.be.null;
      compile(result, template, (err, output)=>{
        expect(err).to.be.null;
        expect(output).to.equal(expectedOutput);
      });
    });

  });


});

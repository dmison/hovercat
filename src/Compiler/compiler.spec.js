/* global describe it */
const expect = require('chai').expect;
const { compile,
  parseYAML,
  extractURLs ,
  matchURLs
} = require('./index.js');

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

  it('should extract urls from YAML text', function(){
    const YAMLText = `url1: http://some.com/path/thing
url2: https://something.com/else/goes/here`;

    const expectedURLs = ['http://some.com/path/thing',
    'https://something.com/else/goes/here'];

    const actualURLs = extractURLs(YAMLText);
    expect(actualURLs).to.deep.equal(expectedURLs);

  });

  it('URLs should merge', function(){
    const newURLs = ['http://some.com/path/thing',
    'https://something.com/else/goes/here',
    'https://another.com/thing/goes/here'];

    const urls = [{
      long: 'http://some.com/path/thing',
      short: 'http://bit.ly/something'
    }];

    const expectedURLs = [{
      long: 'http://some.com/path/thing',
      short: 'http://bit.ly/something'
    },{
      long: 'https://something.com/else/goes/here',
      short: ''
    },{
      long: 'https://another.com/thing/goes/here',
      short: ''
    }];


    const actualURLs = matchURLs(newURLs, urls);
    expect(actualURLs).to.deep.equal(expectedURLs);

  });

});

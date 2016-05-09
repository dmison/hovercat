/* global describe it */
const expect = require('chai').expect;
const {isV1Format} = require('./open.js');
const {convertV1ToV2} = require('./open.js');

const v1File = {
  content: 'title: something\nsummary: some text here',
  urls: [],
  gfmTemplate: 'some markdown',
  htmlTemplate: 'some html'
};

const v2File = {
  content: 'title: something\nsummary: some text here',
  urls: [],
  templates: [
    {
      name: 'Text Email',
      content: 'some markdown',
      type: 'markdown'
    },
    {
      name: 'HTML Email',
      content: 'some html',
      type: 'html'
    }
  ]
};


describe('test file open functions', () => {

  it('testing isV1Format', () => {
    expect(isV1Format(v1File)).to.equal(true);
    expect(isV1Format(v2File)).to.equal(false);
  });

  it('testing convertV1ToV2', () => {
    expect(convertV1ToV2(v1File)).to.deep.equal(v2File);
  });

});

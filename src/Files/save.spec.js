/* global describe it */
const expect = require('chai').expect;
const {ensureExtension} = require('./save.js');

describe('test saving helpers', () => {

  it('testing ensureExtension', () => {
    const path = '/home/path/to/here/';
    const file = 'this_file_name';
    expect(ensureExtension(`${path}${file}.hovercat`)).to.equal(`${path}${file}.hovercat`);
    expect(ensureExtension(`${path}${file}`)).to.equal(`${path}${file}.hovercat`);
    expect(ensureExtension(`${path}${file}.newsletter`)).to.equal(`${path}${file}.newsletter.hovercat`);
  });

});

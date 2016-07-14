/* global describe it */
const expect = require('chai').expect;
const { invalidURLsfromSet } = require('./Bitly.js');

describe('Bitly.actualInvalidURLs()', function() {

  it('should return the URLs that will break when some are shortened', function(){
    const urls = [
      {
        long: 'http://website.com',
        short: ''
      }, {
        long: 'http://website.com/blog',
        short: 'http://short.en/47563'
      }, {
        long: 'http://website.com/blog/2016/04/05/blog-post-title-slug',
        short: ''
      }, {
        long: 'http://website.com/blog/2016/06/01/another-blog-post',
        short: ''
      }
    ];
    const expectedInvalidURLs = [
      'http://website.com/blog/2016/04/05/blog-post-title-slug',
      'http://website.com/blog/2016/06/01/another-blog-post'
    ];

    const actualInvalidURLs = invalidURLsfromSet(urls);
    // console.log(actualInvalidURLs);
    expect(actualInvalidURLs).to.deep.equal(expectedInvalidURLs);

  });

});

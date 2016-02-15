/*eslint-env node, mocha */
var expect = require('expect');

var HCBitly = require('../components/HCBitly.js');

var A = 'http://example.com/blog';
var B = 'http://example.com/blog/hello';
var C = 'http://example.com/blog/hello/world';
var D = 'http://example.com/demos';


var startingURLs = [
  { url: A, shortened: false, shortURL: '' },
  { url: B, shortened: false, shortURL: '' },
  { url: C, shortened: false, shortURL: '' },
  { url: D, shortened: false, shortURL: '' }
];

describe('invalidURLsfromSet', ()=>{

  it('only A is shortened: B & C will break', ()=>{

    var URLs = startingURLs.map((url)=>{
      if (url.url === A){
        url.shortened = true;
        url.shortURL = 'http://bitly/something';
      }
      return url;
    });
    var expectedInvalidURLs = [B,C];
    var actualInvalidURLs = HCBitly.invalidURLsfromSet(URLs);

    expect(expectedInvalidURLs).toEqual(actualInvalidURLs);
  });
  // * unselect B -> A, B
  it('only B is shortened: C will break', ()=>{

    var URLs = startingURLs.map((url)=>{
      if (url.url === B){
        url.shortened = true;
        url.shortURL = 'http://bitly/something';
      }
      return url;
    });
    var expectedInvalidURLs = [C];
    var actualInvalidURLs = HCBitly.invalidURLsfromSet(URLs);

    expect(expectedInvalidURLs).toEqual(actualInvalidURLs);
  });

  // * unselect C -> A, B, C
  it('only C is shortened: no problem', ()=>{

    var URLs = startingURLs.map((url)=>{
      if (url.url === C){
        url.shortened = true;
        url.shortURL = 'http://bitly/something';
      }
      return url;
    });
    var expectedInvalidURLs = [];
    var actualInvalidURLs = HCBitly.invalidURLsfromSet(URLs);

    expect(expectedInvalidURLs).toEqual(actualInvalidURLs);
  });

  // * unselect D -> D
  it('only D is shortened: no problem', ()=>{

    var URLs = startingURLs.map((url)=>{
      if (url.url === D){
        url.shortened = true;
        url.shortURL = 'http://bitly/something';
      }
      return url;
    });
    var expectedInvalidURLs = [];
    var actualInvalidURLs = HCBitly.invalidURLsfromSet(URLs);

    expect(expectedInvalidURLs).toEqual(actualInvalidURLs);
  });

});

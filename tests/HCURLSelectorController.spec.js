/*eslint-env node, mocha */

var expect = require('expect');

var HCURLSelectorController = require('../components/HCURLSelectorController.js');

describe('getOtherURLSthatMatch', function(){

  var allURLS = [
    { url: 'http://example.com/blog', shortened: false, shortURL: '' },
    { url: 'http://example.com/blog/hello', shortened: false, shortURL: '' },
    { url: 'http://example.com/blog/hello/world', shortened: false, shortURL: '' },
    { url: 'http://example.com/demos', shortened: false, shortURL: '' }
  ];

  // four urls, one is a subset of another two
  // none are shortened
  // one is selected
  // = one, two, and three should be selected as a result
  it('three of the urls will be returned for the selected one', ()=>{
    var alreadySelectedURLS = [];
    var selectedURL = 'http://example.com/blog';

    var expectedURLS = [
      'http://example.com/blog',
      'http://example.com/blog/hello',
      'http://example.com/blog/hello/world'
    ];

    var actualURLS = HCURLSelectorController.getOtherURLSthatMatch( selectedURL,
                                                                    alreadySelectedURLS,
                                                                    allURLS);
    expect(expectedURLS).toEqual(actualURLS);
  });

  it('selecting a URL that is not contained in any others will only match self', ()=>{
    var alreadySelectedURLS = [];
    var selectedURL = 'http://example.com/blog/hello/world';

    var expectedURLS = [ 'http://example.com/blog/hello/world' ];

    var actualURLS = HCURLSelectorController.getOtherURLSthatMatch( selectedURL,
                                                                    alreadySelectedURLS,
                                                                    allURLS);
    expect(expectedURLS).toEqual(actualURLS);
  });


});

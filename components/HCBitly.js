var querystring = require('querystring');
var _ = require('lodash');

var shortenURL = function(url, authToken, callback){

  var longURL = querystring.escape(url);
  var bitlyURL = `https://api-ssl.bitly.com/v3/shorten?access_token=${authToken}&longUrl=${longURL}`;

  fetch(bitlyURL).then((response) => {

    response.json().then((result) => {
      if (result.status_code !== 200) {
        var err = `Error shortening URL:\n${url}\n\n${result.status_txt}`;
        return callback(err, null);
      }
      return callback(null, result.data.url);
    });

  });

};

// return the long urls that are supersets of none shortened ones
// ie the ones that will break when the others are shortened
var invalidURLsfromSet = (urls)=>{

  var shorts = urls.filter((url)=>{
    return url.shortened === true;
  }).map((url)=>{
    return url.url;
  });

  var longs = urls.filter((url)=>{
    return url.shortened === false;
  }).map((url)=>{
    return url.url;
  });

  var invalids = shorts.map((shorturl)=>{
    return longs.filter((longurl)=>{
      return longurl.indexOf(shorturl) !== -1;
    });
  }).reduce(function(a, b) {
    return a.concat(b);
  }, []);


  return _.uniq(invalids);

};


module.exports = {
  shortenURL: shortenURL,
  invalidURLsfromSet: invalidURLsfromSet
};

// var A = 'http://example.com/blog';
// var B = 'http://example.com/blog/hello';
// var C = 'http://example.com/blog/hello/world';
// var D = 'http://example.com/demos';
//
//
// var startingURLs = [
//   { url: A, shortened: true, shortURL: '' },
//   { url: B, shortened: false, shortURL: '' },
//   { url: C, shortened: false, shortURL: '' },
//   { url: D, shortened: false, shortURL: '' }
// ];
//
// console.log(invalidURLsfromSet(startingURLs));

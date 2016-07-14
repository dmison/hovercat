const _ = require('lodash');
const querystring = require('querystring');

// ========================================================================
// APIKeyLookup:(username:string, password:string, callback:(error,result))
// look up the Auth Token for Bit.ly
// ========================================================================
const APIKeyLookup = (username, password, callback) => {
  var url = 'https://api-ssl.bitly.com/oauth/access_token';
  var authHeader = window.btoa(`${username}:${password}`);

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`
    }
  }).then((response)=>{
    response.text().then((text)=>{
      // attempt to parse as JSON
      // success means it's actually an error message
      // failure means it's actaully the token
      try {
        var result = JSON.parse(text);
        callback(result, null);
      } catch (e) {
        callback(null,text);
      }
    });
  });
};

// ========================================================================
// APIKeyLookup:(url:string, authToken:string, callback:(error,result))
// get the shortened version of this URL from bit.ly
// ========================================================================
const shortenURL = (url, authToken, callback) => {
  const longURL = querystring.escape(url);
  const bitlyURL = `https://api-ssl.bitly.com/v3/shorten?access_token=${authToken}&longUrl=${longURL}`;
  fetch(bitlyURL).then((response) => {
    response.json().then((result) => {
      if (result.status_code !== 200) {
        return callback(result, null);
      }
      return callback(null, result.data.url);
    });
  });
};

// ========================================================================
// invalidURLsfromSet:(urls:[{long:string, short:String}])
// return the long urls that are supersets of none shortened ones
// ie the ones that will break when the others are shortened
// ========================================================================
var invalidURLsfromSet = (urls)=>{

  var shorts = urls.filter((url)=>{
    return url.short !== '';
  }).map((url)=>{
    return url.long;
  });

  var longs = urls.filter((url)=>{
    return url.short === '';
  }).map((url)=>{
    return url.long;
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


// ========================================================================
module.exports = {
  APIKeyLookup: APIKeyLookup,
  shortenURL: shortenURL,
  invalidURLsfromSet: invalidURLsfromSet
};

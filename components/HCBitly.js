var querystring = require('querystring');

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


module.exports = {
  shortenURL: shortenURL
};

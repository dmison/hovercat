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
      //attempt to parse as JSON if failed then text is token
      try {
        var result = JSON.parse(text);
        callback(result, null);
      } catch (e) {
        callback(null,text);
      }

    });
  });

};

module.exports = {
  APIKeyLookup: APIKeyLookup
};

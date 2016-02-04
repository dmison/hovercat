// [
//   {
//     url: 'http://somethung',
//     shorten: false,
//     shortURL: ''
//   },
//   {
//     url: 'http://somethung.com/test',
//     shorten: true,
//     shortURL: 'http:/sh.com/t'
//   }
//
// ]

var React = require('react');

var querystring = require('querystring');

var BitlyView = React.createClass({

  shortenAll: function(){

    this.props.urls.forEach((url)=>{

      var longURL = querystring.escape(url.url);
      var bitlyURL =`https://api-ssl.bitly.com/v3/shorten?access_token=${this.props.authToken}&longUrl=${longURL}`;

      fetch(bitlyURL).then((response)=>{

        response.json().then((result)=>{
          if (result.status_code !== 200){
            alert(`Error shortening URL:\n${url.url}\n\n${result.status_txt}`);
            return;
          }

          this.props.setShortURL(url.url, result.data.url);
        });

      });

    });

  },

  render: function(){
    var urlFragments = this.props.urls.map(function(url, index){
      return (
        <tr key={index}>
          <td><input type='checkbox' /></td>
          <td>{url.url}</td>
          <td>{url.shortURL}</td>
        </tr>
      );
    });

    return (
      <div>
        <a className='btn btn-default' onClick={this.shortenAll}>Shorten All</a>
        <div className='bitlyTableDiv'>
        <table className='urlTable'>
          <thead>
            <tr>
              <td className='checkboxes'><input type='checkbox' /></td>
              <td className='longURL'>URL</td>
              <td className='shortURL'>Short URL</td>
            </tr>
          </thead>
          <tbody>
          {urlFragments}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
});

module.exports = BitlyView;

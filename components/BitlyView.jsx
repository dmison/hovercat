// [
//   {
//     url: 'http://somethung',
//     shortened: false,
//     shortURL: ''
//   },
//   {
//     url: 'http://somethung.com/test',
//     shortened: true,
//     shortURL: 'http:/sh.com/t'
//   }
//
// ]

var React = require('react');
var querystring = require('querystring');
var BitlyViewListItem = require('./BitlyViewListItem.jsx');

var BitlyView = React.createClass({

  getInitialState: function() {
    return {selectedURLs: []};
  },

  shortenAll: function() {

    this.props.urls.forEach((url) => {

      var longURL = querystring.escape(url.url);
      var bitlyURL = `https://api-ssl.bitly.com/v3/shorten?access_token=${this.props.authToken}&longUrl=${longURL}`;

      fetch(bitlyURL).then((response) => {

        response.json().then((result) => {
          if (result.status_code !== 200) {
            alert(`Error shortening URL:\n${url.url}\n\n${result.status_txt}`);
            return;
          }

          this.props.setShortURL(url.url, result.data.url);
        });

      });

    });

  },

  _selectURL: function(longURL) {
    var urls = this.state.selectedURLs;
    if (urls.indexOf(longURL) === -1) {
      urls.push(longURL);
    } else {
      urls = urls.filter((url) => {
        return url !== longURL;
      });
    }
    this.setState({selectedURLs: urls});
  },

  _selectAllURLs: function() {
    var urls = [];
    if (this.state.selectedURLs.length !== this.props.urls.length) {
      urls = this.props.urls.map((url) => {
        return url.url;
      });
    }

    this.setState({selectedURLs: urls});
  },

  _shortenSelected: function() {
    var urls = this.props.urls.filter((url) => {
      return (this.state.selectedURLs.indexOf(url.url) !== -1);
    });

    urls.forEach((url) => {

      var longURL = querystring.escape(url.url);
      var bitlyURL = `https://api-ssl.bitly.com/v3/shorten?access_token=${this.props.authToken}&longUrl=${longURL}`;

      fetch(bitlyURL).then((response) => {

        response.json().then((result) => {
          if (result.status_code !== 200) {
            alert(`Error shortening URL:\n${url.url}\n\n${result.status_txt}`);
            return;
          }

          this.props.setShortURL(url.url, result.data.url);
        });

      });

    });

  },

  _restoreSelected: function() {
    this.props.urls.forEach((url) => {
      if (this.state.selectedURLs.indexOf(url.url) !== -1) {
        this.props.restoreURL(url.url);
      }
    });
  },

  render: function() {
    var urls = this.props.urls.map((url) => {
      url.selected = (this.state.selectedURLs.indexOf(url.url) !== -1);
      return url;
    });

    var urlFragments = urls.map((url, index) => {
      return (<BitlyViewListItem key={index} selected={url.selected} url={url.url} shortURL={url.shortURL} didSelect={this._selectURL}/>);
    });

    var allSelected = (this.state.selectedURLs.length === this.props.urls.length);

    return (
      <div>
        <a className='btn btn-default' onClick={this._shortenSelected}>Shorten Selected</a>
        <a className='btn btn-default' onClick={this._restoreSelected}>Restore Selected</a>

        <div className='bitlyTableDiv'>
          <table className='urlTable'>
            <thead>
              <tr>
                <td className='checkboxes'><input checked={allSelected} type='checkbox' onChange={this._selectAllURLs}/></td>
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

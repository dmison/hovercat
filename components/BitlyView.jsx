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
var _ = require('lodash');

var HCBitly = require('./HCBitly.js');
var HCURLSelectorController = require('./HCURLSelectorController.js');

var BitlyViewListItem = require('./BitlyViewListItem.jsx');

var BitlyView = React.createClass({

  getInitialState: function() {
    return {selectedURLs: []};
  },

  _selectURL: function(longURL) {
    var urls = this.state.selectedURLs;
    var urlsToAddToSelection = HCURLSelectorController.getOtherURLSthatMatch(longURL, this.state.selectedURLs, this.props.urls);

    if (urls.indexOf(longURL) === -1) {
      urls.push(longURL);
      urls = urls.concat(urlsToAddToSelection);
    } else {
      urls = urls.filter((url) => {
        return url !== longURL;
      });
    }

    urls = _.uniq(urls);
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
      HCBitly.shortenURL(url.url, this.props.authToken, (err, shortURL)=>{
        if(err){
          alert(err);
        } else {
          this.props.setShortURL(url.url, shortURL);
        }
      });
    });
    this.setState( { selectedURLs: [] });
  },

  _restoreSelected: function() {
    this.props.urls.forEach((url) => {
      if (this.state.selectedURLs.indexOf(url.url) !== -1) {
        this.props.restoreURL(url.url);
      }
    });
    this.setState( { selectedURLs: [] });
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

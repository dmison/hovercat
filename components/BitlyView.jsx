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
var _ = require('lodash');

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
    var urlsToAddToSelection = this.getOtherURLSthatMatch(longURL);

    if (urls.indexOf(longURL) === -1) {
      urls.push(longURL);
      urls = urls.concat(urlsToAddToSelection);
    } else {
      urls = urls.filter((url) => {
        return url !== longURL;
      });
    }

    // if longURL is already shortened
    //  - this means it is being selected for un-shortening
    //  - get the list of unselected shortend urls that would also match longURL
    //  - mark those as selected too


    // if longURL is not shortened
    //  - this means it is being selected for shortening
    //  - get the list of unselected non-shortened urls that longURL will also match
    //  - mark those as selected too

    // console.log(JSON.stringify(urlsToAddToSelection.map((url)=>{
    //   return url.url;
    // })));

    // dedupe urls
    urls = _.uniq(urls);
    this.setState({selectedURLs: urls});
  },

  getOtherURLSthatMatch: function(selectedURL){

    // all the urls that are not selected
    var unselectedURLs = this.props.urls.filter((url)=>{
      return this.state.selectedURLs.indexOf(url.url) === -1;
    });

    // has selectedURL already been shortened?
    var alreadyShortened = this.props.urls.filter((url)=>{
      return url.url === selectedURL;
    }).reduce((prev,curr, index, array)=>{
      return array[index].shortened;
    }, false);

    if(alreadyShortened){
      // return all the unselected urls that are in selectedURL
      return unselectedURLs.filter((url)=>{
        return selectedURL.indexOf(url.url) !== -1;
      }).map((url)=>{
        return url.url;
      });

    } else {
      // return all the unselected urls that have selectedURL in them
      return unselectedURLs.filter((url)=>{
        return url.url.indexOf(selectedURL) !== -1;
      }).map((url)=>{
        return url.url;
      });

    }


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

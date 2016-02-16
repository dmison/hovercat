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
var Table = require('react-bootstrap/lib/Table');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var HCBitly = require('./HCBitly.js');
var BitlyViewListItem = require('./BitlyViewListItem.jsx');

var BitlyView = React.createClass({

  getInitialState: function() {
    return {
      selectedURLs: [],
      height: window.innerHeight-170
    };
  },

  handleResize: function(e){
    this.setState({
      height: window.innerHeight-170
    });
    this.forceUpdate();
  },

  componentDidMount: function(){
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function(){
    window.removeEventListener('resize', this.handleReize);
  },

  _unselectURL: function(longURL){
    var remainingURLs = this.state.selectedURLs.filter((url)=>{
      return url !== longURL;
    });
    this.setState({selectedURLs: remainingURLs});
  },

  _selectURL: function(longURL) {
    var urls = this.state.selectedURLs;
    urls.push(longURL);
    urls = _.uniq(urls);
    this.setState({selectedURLs: urls});
  },

  _toggleSelectAllURLs: function() {
    var urls = [];
    if (this.state.selectedURLs.length !== this.props.urls.length) {
      urls = this.props.urls.map((url) => {
        return url.url;
      });
    }

    this.setState({selectedURLs: urls});
  },

  // shorten the URLS that are selected
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
          this._unselectURL(url.url);
        }
      });
    });

  },

  // unshorten the selected URLS
  _restoreSelected: function() {
    this.props.urls.forEach((url) => {
      if (this.state.selectedURLs.indexOf(url.url) !== -1) {
        this.props.restoreURL(url.url);
      }
    });
    this.setState( { selectedURLs: [] });
  },

  // ========================================================================
  render: function() {

    var style = { height: this.state.height, margin: 12 };

    var urls = this.props.urls.map((url) => {
      url.selected = (this.state.selectedURLs.indexOf(url.url) !== -1);
      return url;
    });

    var invalidURLs = HCBitly.invalidURLsfromSet(urls);

    var urlFragments = urls.map((url, index) => {
      return (<BitlyViewListItem  key={index}
                                  selected={url.selected}
                                  url={url.url}
                                  shortURL={url.shortURL}
                                  didUnSelect={this._unselectURL}
                                  didSelect={this._selectURL}
                                  invalid={invalidURLs.indexOf(url.url) !== -1} />);
    });

    var allSelected = (this.state.selectedURLs.length === this.props.urls.length);

    var noURLsDiv = (urls.length === 0)? <div>No URLs found</div> : '';


    var enableShortenBtn = urls.filter((url)=>{
      return url.selected;
    }).reduce((prev, url)=>{
      return  prev || url.shortened !== true;
    }, false);



    var enableRestoreBtn = urls.filter((url)=>{
      return url.selected;
    }).reduce((prev, url)=>{
      return prev || url.shortened === true;
    }, false);

    return (
      <div>
        <ButtonToolbar className='shorteningToolbar'>
          <a className='btn btn-default pull-right' disabled={!enableShortenBtn} onClick={this._shortenSelected}><i className="fa fa-chevron-right"></i><i className="fa fa-chevron-left"></i> Shorten Selected</a>
          <a className='btn btn-default pull-right' disabled={!enableRestoreBtn} onClick={this._restoreSelected}><i className="fa fa-chevron-left"></i><i className="fa fa-chevron-right"></i> Restore Selected</a>
        </ButtonToolbar>
        <div style={style} className='bitlyTableDiv'>
          <Table condensed className='urlTable'>
            <thead>
              <tr>
                <th className='checkboxes'><input checked={allSelected} type='checkbox' onChange={this._toggleSelectAllURLs}/></th>
                <th className='longURL'>Long URL</th>
                <th className='shortURL'>Short URL</th>
              </tr>
            </thead>
            <tbody>
              {urlFragments}
            </tbody>
          </Table>
          {noURLsDiv}
        </div>
      </div>
    );
  }
});

module.exports = BitlyView;

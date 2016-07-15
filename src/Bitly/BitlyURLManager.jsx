const React = require('react');
const async = require('async');

const BitlyURLRow = require('./BitlyURLRow.jsx');
const {shortenURL, invalidURLsfromSet} = require('./Bitly.js');

const BitlyURLManager = React.createClass({

  propTypes: function(){
    return {
      urls: React.PropTypes.array,
      shortenURLs: React.PropTypes.func,
      unshortenURLs: React.PropTypes.func,
      authToken: React.PropTypes.string,
      setURLs: React.PropTypes.func,
      onChange: React.PropTypes.func
    };
  },

  getInitialState: function(){
    return {
      urls: []
    };
  },

  render: function(){
    const style = {
      height: this.props.height,
      overflowY: 'scroll'
    };

    const invalidURLs = invalidURLsfromSet(this.state.urls);

    return (
      <div style={style}>
        <button className='btn btn-default pull-right' style={{marginRight: 10}} onClick={this._shortenSelected}>Shorten Selected</button>
        <button className='btn btn-default pull-right' style={{marginRight: 10}} onClick={this._restoreSelected}>Restore Selected</button>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th><input type='checkbox' checked={this._allSelected()} onChange={this._toggleSelectAll}/></th>
              <th>URL</th>
              <th>Shortened</th>
            </tr>
          </thead>
          <tbody>
            {this.state.urls.map((url, index)=>{
              const invalid = invalidURLs.indexOf(url.long) !== -1;
              return <BitlyURLRow key={index} url={url} invalid={invalid} onClick={this._urlClicked} />;
            })}
          </tbody>
        </table>


      </div>
    );

  },

  componentWillReceiveProps: function(newProps){
    this._setupStateWithURLs(newProps.urls);
  },

  componentWillMount: function(){
    this._setupStateWithURLs(this.props.urls);
  },

  // urls come from props.
  _setupStateWithURLs: function(urls){
    const forState = urls.map((url)=>{
      // if already in state,
      const matchedInState = this.state.urls.find((stateURL)=>{ return stateURL.long === url.long; });
      if(matchedInState){
        // match selected & error_msg
        return {
          long: url.long,
          short: url.short,
          selected: matchedInState.selected,
          error_msg: matchedInState.error_msg
        };
      } else {
        // otherwise create new
        return {
          long: url.long,
          short: url.short,
          selected: false,
          error_msg: ''
        };
      }
    });
    this.setState({ urls: forState });
  },

  _allSelected: function(){
    return this.state.urls.filter((url)=>{
      return url.selected;
    }).length === this.state.urls.length;
  },

  // if all are selected, then deselect all, else select all
  _toggleSelectAll: function(){
    const selectAll = !this._allSelected();
    const updated = this.state.urls.map((url)=>{
      return Object.assign({}, url, { selected: selectAll });
    });
    this.setState( { urls: updated } );
  },

  _urlClicked: function(selectedURL, checked){
    const updated = this.state.urls.map((url)=>{
      return Object.assign(url, {selected: (url.long === selectedURL)? checked : url.selected});
    });
    this.setState({ urls: updated });
  },

  _shortenSelected: function(){
    async.map(this.state.urls, (url, done)=>{
      if(url.selected){
        shortenURL(url.long, this.props.authToken, (err, shorturl)=>{
          if(err){
            done(null, Object.assign({}, url, {error_msg: err.status_txt}));
          } else {
            done(null, Object.assign({}, url, {short: shorturl, selected: false}));
          }

        });
      } else {
        done(null, url);
      }
    }, (err, results)=>{
      // ensure setURLs is not called until setState is complete
      this.setState({urls: results}, ()=>{
        this.props.setURLs(results.map((url)=>{
          return {
            long: url.long,
            short: url.short
          };
        }));
        this.props.onChange();
      });
    });
  },

  _restoreSelected: function(){
    const restored = this.state.urls.map((url)=>{
      return url.selected? Object.assign({}, url, {short: '', selected: false, error_msg:''}): url;
    });
    // ensure setURLs is not called until setState is complete
    this.setState({urls: restored}, ()=>{
      this.props.setURLs(restored.map((url)=>{
        return {
          long: url.long,
          short: url.short
        };
      }));
      this.props.onChange();
    });
  }

});

module.exports = BitlyURLManager;

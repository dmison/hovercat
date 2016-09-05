import React from 'react';

import AceEditor from 'react-ace';

import 'brace/ext/language_tools';
import 'brace/mode/markdown';
import 'brace/mode/yaml';
import 'brace/mode/html';
import 'brace/theme/tomorrow';

var Editor = React.createClass({
  propTypes: function(){
    return {
      content: React.PropTypes.string,
      height: React.PropTypes.number,
      onChange: React.PropTypes.func,
      mode: React.PropTypes.string,
      theme: React.PropTypes.string,
      wrapEnabled: React.PropTypes.bool,
      enableBasicAutocompletion: React.PropTypes.bool,
      enableLiveAutocompletion: React.PropTypes.bool
    };
  },

  shouldComponentUpdate: function(nextProps) {
    return ( (nextProps.content !== this.props.content) ||
      (nextProps.wrapEnabled !== this.props.wrapEnabled) ||
      (nextProps.basicAutoComplete !== this.props.basicAutoComplete) ||
      (nextProps.liveAutoComplete !== this.props.liveAutoComplete) ||
    (nextProps.height !== this.props.height) );
  },

  render: function() {
    var name = `${this.props.mode}Editor`;
    var height = `${this.props.height}px`;

    return (
      <AceEditor
        name={name}
        height={height}
        mode={this.props.mode}
        theme={this.props.theme}
        width='90%'
        fontSize='15px'
        onChange={(content)=>{ this.props.onChange(content); }}
        value={this.props.content}
        wrapEnabled={this.props.wrapEnabled}
        showPrintMargin={false}
        enableBasicAutocompletion={this.props.enableBasicAutocompletion}
        enableLiveAutocompletion={this.props.enableLiveAutocompletion}
      />
    );
  }

});

module.exports = Editor;

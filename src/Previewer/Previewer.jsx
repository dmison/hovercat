const React = require('react');
const ReactDOM = require('react-dom');

var Previewer = React.createClass({

  propTypes: function(){
    return {
      templateType: React.PropTypes.string,
      height: React.PropTypes.number,
      content: React.PropTypes.string
    };
  },

  getFrameBody: function(type, content){
    if (type === 'markdown'){
      const body = content.split('\n').map((line)=>{ return `<div>${line.trim() === ''? '<br/>' : line}</div>`;}).join('\n');
      return `<div>
      <style>
        div.text-output {
          background-color: #e6e6e6;
          border-radius: 10px;
          border: 1px solid #cccccc;
          margin: 0px;
          padding: 15px 15px;
          word-break: auto;
          font-family: Menlo, monospace;
          font-size: 14px;
          line-height: 1.4;
          color: black;
          font-weight: 500;
        }
      </style>
<div class="text-output">${body}</div>
</div>`;
    }
    if (type === 'html'){
      return `<div>${content}</div>`;
    }
  },

  getFrameContent: function(type, content){
    switch(type){
    case 'markdown': {
      return `<html>
          <body>
          ${this.getFrameBody(type, content)}
        </body>
        </html>`;
    }
    case 'html': {
      return `<html>
          <head>
            <style>html { overflow-x: wrap; overflow-y: scroll; } </style>
          </head>
          <body>
          ${this.getFrameBody(type, content)}
          </body>
        </html>`;
    }
    default: {
      return `<html>
          <head>
          </head>
        </html>`;
    }
    }

  },

  updateFrameBody: function(type, content){
    let frameBody = ReactDOM.findDOMNode(this).contentDocument.body;
    const newBodyStr = this.getFrameBody(type, content);
    frameBody.innerHTML = newBodyStr;
  },

  render: function(){
    var style = {
      height: this.props.height,
      marginTop: 12,
      marginLeft: 12,
      marginRight: 12,
      overflowX: 'wrap'
    };

    if (this.props.templateType === 'markdown'){
      return (
        <iframe style={style} ref='iframe' className='previewer textpreview' scrolling='yes'  />
      );
    }
    if (this.props.templateType === 'html'){
      return (
        <iframe style={style} ref='iframe' className='previewer htmlpreview' scrolling='yes'  />
      );
    }
  },

  shouldComponentUpdate: function(nextProps){
    return (this.props.height !== nextProps.height) || (this.props.templateType !== nextProps.templateType);
  },

  componentDidMount: function(){
    this.updateFrameBody(this.props.templateType, this.props.content);
  },

  componentWillReceiveProps: function(nextProps){
    this.updateFrameBody(nextProps.templateType, nextProps.content);
  }

});

module.exports = Previewer;

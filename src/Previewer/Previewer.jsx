var React = require('react');

var Previewer = (props)=>{

  var style = {
    height: props.height,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12
  };
  
  if (props.templateType === 'markdown'){
    let frameContent = `<html>
      <head>
        <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap-theme.min.css">
        <style>html { overflow-x: wrap; overflow-y: scroll; } </style>
      </head>
      <body>
        <pre style="overflow: wrap; word-break: auto;"><code>${props.content}</code></pre>
      </body>
    </html>`;
    return (
      <iframe style={style} className="previewer textpreview" scrolling="yes" srcDoc={frameContent}></iframe>
    );
  }

  if (props.templateType === 'html'){
    let frameContent = `<html>
      <head>
        <style>html { overflow-x: wrap; overflow-y: scroll; } </style>
      </head>
      <body>
        <div>${props.content}</div>
      </body>
    </html>`;

    return (
      <iframe style={style} className="previewer htmlpreview" scrolling="yes" srcDoc={frameContent}></iframe>
    );
  }
};

Previewer.propTypes = {
  templateType: React.PropTypes.string,
  height: React.PropTypes.number,
  content: React.PropTypes.string
};



module.exports = Previewer;

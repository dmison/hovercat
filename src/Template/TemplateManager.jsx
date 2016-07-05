const React = require('react');
const {hashHistory} = require('react-router');

const TemplateManagerList = require('./TemplateManagerList.jsx');

// ======================================================= TemplateManager
const TemplateManager = React.createClass({

  render: function(){

    var style = {
      height: this.props.height,
      marginTop: 12,
      marginLeft: 12,
      marginRight: 12,
      paddingLeft: 12,
      paddingRight:12,
      overflowY: 'scroll'
    };

    return (
      <div className='container' style={{paddingTop:15}}>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title pull-left'>Manage Templates</h3>
              <button className='btn btn-info pull-right' onClick={()=>{hashHistory.push('/');}} >Done</button>
              <div className='clearfix'></div>
            </div>
            <div className='panel-body'>
              <div style={style}>
                <TemplateManagerList {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  propTypes: function(){
    return {
      addTemplate: React.PropTypes.func,
      deleteTemplate: React.PropTypes.func,
      updateTemplate: React.PropTypes.func,
      templates: React.PropTypes.array,
      height: React.PropTypes.number
    };
  }

});






module.exports = TemplateManager;

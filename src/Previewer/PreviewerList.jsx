const React = require('react');
const {Tab, Tabs, TabList, TabPanel} = require('react-tabs');
const Previewer = require('./Previewer.jsx');

const PreviewerList = React.createClass({

  propTypes: function(){
    return {
      content: React.PropTypes.string,
      height: React.PropTypes.number,
      templates: React.PropTypes.array,
      addError: React.PropTypes.func
    };
  },

  render: function(){

    return this.props.templates.length > 0 ?  (
      <Tabs>
        <TabList>
          {this.props.templates.map((template, index)=>{
            return <Tab key={index}>{template.name} - {template.type}</Tab>;
          })}
        </TabList>

        {this.props.templates.map((template, index)=>{
          return <TabPanel key={index}>
            <Previewer  content={this.props.content} height={this.props.height} template={template} addError={this.props.addError} clearError={this.props.clearError} />
          </TabPanel>;
        })}
      </Tabs>
    ) : (
      <div>
        <h3>No templates</h3>
        <p>Maybe you should add one. </p>
      </div>
    );
  }

});

module.exports = PreviewerList;

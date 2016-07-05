const React = require('react');
const TemplateListItem = require('./TemplateListItem.jsx');

const TemplateManagerList = React.createClass({

  propTypes: function(){
    return {
      templates: React.PropTypes.array,
      addTemplate: React.PropTypes.func,
      deleteTemplate: React.PropTypes.func,
      updateTemplate: React.PropTypes.func
    };
  },

  getInitialState: function(){
    return {
      adding: false
    };
  },

  render: function(){

    const style = {
      marginTop: 15
    };

    const potentialTemplate = {
      name: '',
      type: 'html'
    };

    const noTemplateMessage = (
      <div style={{marginBottom: 30}}>
        <h3 style={{marginTop: 10}}>You have no templates</h3>
        <p>Maybe you should add one.</p>
      </div>
    );

    return (
      <div >

        {this.props.templates.length === 0 ? noTemplateMessage : null }
        <button className='btn btn-default' onClick={this._addPotentialTemplate}>Add Template</button>

        <table style={style} className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Template Name</th>
              <th>Template Type</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
          {this.props.templates.map((template, index)=>{
            return <TemplateListItem key={index} onDelete={this.props.deleteTemplate} onUpdate={this.props.updateTemplate} template={template} />;
          })}
          {this.state.adding? <TemplateListItem key={this.props.templates.length+1} newItem={this.state.adding} onDiscard={this._discardPotentialTemplate} onUpdate={this._saveNewTemplate}  template={potentialTemplate}/> : null }
          </tbody>
        </table>

      </div>

    );

  },

  _saveNewTemplate: function(id, name, type){
    this.props.addTemplate(name, type, '');
    this.setState({ adding: false });
  },

  _addPotentialTemplate: function(){
    this.setState({ adding: true });
  },

  _discardPotentialTemplate: function(){
    this.setState({ adding: false });
  }

});

module.exports = TemplateManagerList;


// <AddTemplate  onAdd={(name, type)=>{ this.this.props.addTemplate(name, type, ''); }} />

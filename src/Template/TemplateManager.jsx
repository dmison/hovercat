const React = require('react');
const {createHistory} = require('history');

const AddTemplate = require('./AddTemplate.jsx');
const TemplateDetailsForm = require('./TemplateDetailsForm.jsx');

// ======================================================= TemplateManager
const TemplateManager = React.createClass({

  render: function(){

    const history = createHistory();

    return (
      <div className='container'>
        <button className='btn btn-default' onClick={()=>{history.goBack();}} >&lt; We're done here</button>
        <hr/>
        <AddTemplate  onAdd={(name, type)=>{ this.props.addTemplate(name, type, ''); }} />
        <hr/>
        <TemplateManagerList {...this.props} />
      </div>
    );
  },

  propTypes: function(){
    return {
      addTemplate: React.PropTypes.func,
      deleteTemplate: React.PropTypes.func,
      updateTemplate: React.PropTypes.func,
      templates: React.PropTypes.array
    };
  }

});


// ======================================================= TemplateManagerList
const TemplateManagerList = (props) => {
  return (
    <ul>
      {props.templates.map((template, index)=>{
        return (
          <li key={index}>
            <TemplateListItem onDelete={props.deleteTemplate} onUpdate={props.updateTemplate} template={template} />
          </li>
        );
      })}
    </ul>
  );
};
TemplateManagerList.propTypes = {
  templates: React.PropTypes.array,
  deleteTemplate: React.PropTypes.func,
  updateTemplate: React.PropTypes.func
};


// ======================================================= TemplateListItem
const TemplateListItem = React.createClass({

  propTypes: function(){
    return {
      template: React.PropTypes.object,
      onDelete: React.PropTypes.func,
      onUpdate: React.PropTypes.func
    };
  },

  getInitialState:function(){
    return {
      showEditor: false,
      newName: '',
      newType: 'html'
    };
  },

  componentWillMount: function() {
    this.setState({ newName: this.props.template.name, newType:this.props.template.type});
  },

  _cancelEdit: function(){
    this.setState({ newName: this.props.template.name, newType:this.props.template.type, showEditor: false });
  },

  _saveChanges: function(){
    this.props.onUpdate(this.props.template.id, this.state.newName, this.state.newType);
    this.setState({ showEditor: false });
  },

  render: function(){

    if(this.state.showEditor){
      return (
        <div>
          <TemplateDetailsForm  name={this.state.newName} type={this.state.newType}
                                onNameChange={(name)=>{ this.setState({newName: name});}}
                                onTypeChange={(type)=>{ this.setState({newType: type});}} />
          <button onClick={this._cancelEdit} className='btn btn-default'>Cancel</button>
          <button onClick={this._saveChanges} className='btn btn-default'>Save</button>

        </div>
      );
    } else {
      return (
        <div>
          <span>{this.props.template.name}</span>
          <span className='label label-default'>{this.props.template.type}</span>
          <span><button onClick={()=>{ this.setState({showEditor:true});} } className='btn btn-sm btn-info'><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></span>
          <span><button onClick={()=>{
            if (window.confirm('Are you sure you want to delete this template?')) {
              this.props.onDelete(this.props.template.id);
            }
          }} className='btn btn-sm btn-danger'><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></span>
        </div>
      );

    }

  }


});

module.exports = TemplateManager;


// <TemplateDetailsForm  name={this.state.name} type={this.state.newType}
//                       onNameChange={(name)=>{ this.setState({newName: name});}}
//                       onTypeChange={(type)=>{ this.setState({newType: type});}} />
// <button onClick={ ()=>{ this.setState({ newName: '', newType:'html', showAddTemplate: false }); } }
//         className='btn btn-default'>Cancel</button>
// <button onClick={()=>{ this.props.onAdd(this.state.newName, this.state.newType); this.setState({ showAddTemplate: false , newName: '', newType:'html' });}}
//         className='btn btn-default'>Save</button>

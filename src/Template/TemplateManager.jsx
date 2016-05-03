const React = require('react');
const {createHistory} = require('history');

const AddTemplate = require('./AddTemplate.jsx');
const TemplateDetailsForm = require('./TemplateDetailsForm.jsx');

// ======================================================= TemplateManager
const TemplateManager = React.createClass({

  render: function(){

    const history = createHistory();

    return (
      <div className='container col-md-10 col-md-offset-1'>
        <div className='panel panel-default'>

          <div className='panel-heading'>
            <h3 className='panel-title'>Template Manager</h3>
          </div>

          <div className='panel-body'>

            <div className='row'>
              <div className='col-md-8'>
                <AddTemplate  onAdd={(name, type)=>{ this.props.addTemplate(name, type, ''); }} />
              </div>
              <div className='col-md-4'>
                <button className='btn btn-info pull-right' onClick={()=>{history.goBack();}} >Done</button>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-8'>
                <TemplateManagerList {...this.props} />
              </div>
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
      templates: React.PropTypes.array
    };
  }

});


// ======================================================= TemplateManagerList
const TemplateManagerList = (props) => {
  const style = {
    marginTop: 15
  };

  return props.templates.length>0 ? (
    <div style={style}>
    <table className='table table-striped table-hover'>
      <tbody>
      {props.templates.map((template, index)=>{
        return <TemplateListItem key={index} onDelete={props.deleteTemplate} onUpdate={props.updateTemplate} template={template} />;
      })}
      </tbody>
    </table>
    </div>
  ): (
    <div>
      <h3>No templates</h3>
      <p>Maybe you should add one.</p>
    </div>
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
        <tr>
          <td>
            <TemplateDetailsForm  name={this.state.newName} type={this.state.newType}
                                          onNameChange={(name)=>{ this.setState({newName: name});}}
                                          onTypeChange={(type)=>{ this.setState({newType: type});}} />
          </td>
          <td>
            <button onClick={this._cancelEdit} className='btn btn-default'>Cancel</button>
            <button onClick={this._saveChanges} className='btn btn-default'>Save</button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{this.props.template.name} <span className='label label-default'>{this.props.template.type}</span></td>
          <td>
            <button onClick={()=>{ this.setState({showEditor:true});} } className='btn btn-xs btn-info'><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
            <button onClick={()=>{
              if (window.confirm('Are you sure you want to delete this template?')) {
                this.props.onDelete(this.props.template.id);
              }
            }} className='btn btn-xs btn-danger'><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete</button>
          </td>
      </tr>
      );

    }

  }


});

module.exports = TemplateManager;

const React = require('react');
const {hashHistory} = require('react-router');
const TemplateExportRow = require('./TemplateExportRow.jsx');

const ExportManager = React.createClass({

  propTypes: function(){
    return {
      templates: React.PropTypes.array,
      output: React.PropTypes.array,
      height: React.PropTypes.number
    };
  },

  getInitialState: function(){
    return {
      selectedOutputs: []
    };
  },

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
              <h3 className='panel-title pull-left'>Export</h3>
              <button className='btn btn-default pull-right' onClick={()=>{hashHistory.push('/');}} >Close</button>
              <button className='btn btn-default pull-right' onClick={this._exportSelected} style={{marginRight: 10}}>Export Selected</button>
              <div className='clearfix'></div>
            </div>
            <div className='panel-body'>
              <div style={style}>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th style={{width:45}}>
                      <input type='checkbox' checked={this._areAllSelected()} onClick={this._selectAllToggle} readOnly />
                    </th>
                    <th>Template Name</th>
                    <th>Template Type</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.templates.map((template, index)=>{
                  const selected = this.state.selectedOutputs.reduce((prev,curr)=>{
                    return curr.id === template.id? true : prev;
                  },false);
                  return (
                    <TemplateExportRow key={index} template={template} selected={selected} onClick={this._adjustSelection}/>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _areAllSelected: function(){
    return this.state.selectedOutputs.length === this.props.output.length;
  },

  _selectAllToggle: function(){
    if(this._areAllSelected()){
      this.setState( { selectedOutputs: [] } );
    } else {
      this.setState( { selectedOutputs: this.props.output } );
    }
  },

  _adjustSelection: function(templateID, isSelected){

    let updateSelection = this.state.selectedOutputs;
    if(isSelected){
      const newlySelected = this.props.output.filter((output)=>{
        return output.id === templateID;
      });
      updateSelection = this.state.selectedOutputs.concat(newlySelected);

    } else {
      updateSelection = this.state.selectedOutputs.filter((output)=>{
        return output.id !== templateID;
      });
    }
    this.setState( { selectedOutputs : updateSelection });
  },

  _exportSelected: function(){

    const out = this.state.selectedOutputs.map((output)=>{
      const matchingTemplate = this.props.templates.find((template)=>{
        return template.id === output.id;
      });
      return Object.assign({}, output, { name: matchingTemplate.name, type: matchingTemplate.type });
    });

    //TODO: now write to file

  }


});

module.exports = ExportManager;

const React = require('react');
const {hashHistory} = require('react-router');
const TemplateExportRow = require('./TemplateExportRow.jsx');
const {exportFiles} = require('../Files/export.js');
const {dialog} = require('electron').remote;

const ExportManager = React.createClass({

  propTypes: function(){
    return {
      output: React.PropTypes.array,
      height: React.PropTypes.number,
      homeDir: React.PropTypes.string
    };
  },

  getInitialState: function(){
    return {
      outputs: []
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

    const panelBody = this.props.output.length === 0 ? this.emptyPanel() : this.exportTable(this.state.outputs);

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
                {panelBody}
            </div>
          </div>
        </div>
      </div>
    );
  },

  componentWillMount: function(){
    const updated = this.props.output.map((output)=>{
      return Object.assign({}, output, { selected: false, error:''});
    });
    this.setState({ outputs: updated });
  },

  // ======================================================================
  emptyPanel: function(){
    return (
      <div>
        <h3>No templates</h3>
        <p>Maybe you should add one. </p>
      </div>
    );
  },

  exportTable: function(outputs){
    return (
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th style={{width:45}}>
              <input type='checkbox' checked={this._areAllSelected()} onClick={this._selectAllToggle} readOnly />
            </th>
            <th>Template Name</th>
            <th>Template Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {outputs.map((output, index)=>{
            return (
              <TemplateExportRow key={index} name={output.name} id={output.id} type={output.type} selected={output.selected} error={output.error} onClick={this._adjustSelection}/>
            );

          })}
        </tbody>
      </table>

    );
  },

  // {this.props.templates.map((template, index)=>{
  //   const selected = this.state.selectedOutputs.reduce((prev,curr)=>{
  //     return curr.id === template.id? true : prev;
  //   },false);
  //   return (
  //     <TemplateExportRow key={index} template={template} selected={selected} error={''} onClick={this._adjustSelection}/>
  //   );
  // })}


  // ======================================================================
  // true if all items have selected === true
  _areAllSelected: function(){
    return this.state.outputs.filter((output)=>{
      return output.selected;
    }).length === this.state.outputs.length;
  },

  // select all items if any are unselected
  // unselect all if all items are already selected
  _selectAllToggle: function(){
    const selectAll = !this._areAllSelected();
    const selectedAll = this.state.outputs.map((output)=>{
      output.selected = selectAll;
      return output;
    });
    this.setState( { outputs: selectedAll } );
  },

  // updated selected property of the items specified by templateID
  _adjustSelection: function(templateID, isSelected){
    const updatedOutputs = this.state.outputs.map((output)=>{
      output.selected = (output.id === templateID)? isSelected : output.selected;
      return output;
    });
    this.setState( { outputs : updatedOutputs });
  },

  _exportSelected: function(){

    const exportDir = dialog.showOpenDialog({properties: ['openDirectory']});

    if(!exportDir)return; // means cancel was clicked so just return

    exportFiles(exportDir, this.state.outputs, (results)=>{
      const updatedOutputs = this.state.outputs.map((output)=>{
        if(output.selected) {
          const matchingResult = results.find((result)=>{
            return result.id === output.id;
          });
          output.error = matchingResult.err? matchingResult.err.message: 'success';
        } else {
          output.error = '';
        }
        return output;
      });

      this.setState( { outputs: updatedOutputs } );

    });
  }


});

module.exports = ExportManager;

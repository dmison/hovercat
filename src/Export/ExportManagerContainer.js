const {connect} = require('react-redux');
const ExportManager = require('./ExportManager.jsx');

const mapStateToProps = (state) => {
  return {
    output: state.templates.map((template)=>{
      const matchingOutput = state.output.find((output)=>{ return template.id === output.id; });
      return Object.assign({}, template, { content: matchingOutput.output});
    }),
    homeDir: state.uistate.homeDir,
    height: state.uistate.height-50
  };
};

module.exports = connect(mapStateToProps)(ExportManager);

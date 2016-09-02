const React = require('react');

const EmailFormatSelector = (props) => {

  return (
    <div className='form-group row'>
      <label className='col-sm-2 control-label'>Formats:</label>

      <div className='col-sm-5'>

        <div className='col-sm-4'>
          <label>
            <input  type='checkbox'
                    checked={props.htmlEnabled}
                    onChange={ ()=> {
                      props.setHTML(!props.htmlEnabled, props.htmlSelection);
                    } }
                    />
              {' '}HTML
            </label>
        </div>
        <div className='col-sm-8 form-group'>
          <select value={props.htmlSelection}
                  className='form-control'
                  onChange={(event)=>{ props.setHTML(props.htmlEnabled, event.target.value); }}
                  disabled={!props.htmlEnabled}>
            {props.htmlFormats.map((output, index)=>{
              return (
                <option key={index} value={output}>{output}</option>
              );
            })}
          </select>
        </div>

        <div className='col-sm-4'>
          <label>
            <input  type='checkbox'
                    checked={props.textEnabled}
                    onChange={ ()=> { props.setTEXT(!props.textEnabled, props.textSelection); } }
                    />
                  {' '}TEXT
            </label>
        </div>
        <div className='col-sm-8 form-group'>
          <select value={props.textSelection}
                  className='form-control'
                  onChange={(event)=>{ props.setTEXT(props.textEnabled, event.target.value); }}
                  disabled={!props.textEnabled}>
            {props.textFormats.map((output, index)=>{
              return (
                <option key={index} value={output}>{output}</option>
              );
            })}
          </select>
        </div>

      </div>

      <div className='col-sm-5'>
      What content to send
      </div>

    </div>
  );
};

EmailFormatSelector.propTypes = {
  htmlFormats: React.PropTypes.array,
  textFormats: React.PropTypes.array,
  htmlEnabled: React.PropTypes.bool,
  textEnabled: React.PropTypes.bool,
  htmlSelection: React.PropTypes.string,
  textSelection: React.PropTypes.string,
  setHTML: React.PropTypes.func,
  setTEXT: React.PropTypes.func
};

module.exports = EmailFormatSelector;

const {content_reducer} = require('../Content/reducers.js');
const {error_reducer} = require('../Errors/reducers.js');
const {template_reducer} = require('../Template/reducers.js');
const {uistate_reducer} = require('../UIState/reducers.js');
const {config_reducer} = require('../Config/reducers.js');
const output_reducer = require('../Compiler/reducers.js');

const { createStore, applyMiddleware, combineReducers } = require('redux');
const thunk = require('redux-thunk').default;

// const logger = store => next => action => {
//   console.log('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   return result;
// };

const AppReducer = combineReducers({
  templates: template_reducer,
  output: output_reducer,
  content: content_reducer,
  errors: error_reducer,
  config: config_reducer,
  uistate: uistate_reducer
});

const defaultState = {
  templates: [],
  output: [],
  content: '',
  errors: [],
  config: {
    'editor':{
      'wrapEnabled': true,
      'enableLiveAutoCompletion': false,
      'enableBasicAutoCompletion': false
    },
    'bitlyAccessToken': '',
    'email': {
      'defaultSender': '',
      'gmail': {
        'username': '',
        'appPassword': ''
      },
      'smtp': {
        'host': '',
        'port': 25,
        'tls': {
          'rejectUnauthorized': true
        }
      }
    }
  },
  uistate: {
    'saved': true,
    'saving': false,
    'resourcesPath': '',
    'filename': '',
    'active': false,
    'height': window.innerHeight-138,
    'consoleHeight': 42,
    'errorConsoleVisible': true,
    'homeDir': ''
  }
};

const store = createStore(AppReducer, defaultState, applyMiddleware(thunk));

module.exports = store;

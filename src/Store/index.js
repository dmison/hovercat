const {content_reducer} = require('../Content/reducers.js');
const {error_reducer} = require('../Errors/reducers.js');
const {template_reducer} = require('../Template/reducers.js');
const {uistate_reducer} = require('../UIState/reducers.js');
const {config_reducer} = require('../Config/reducers.js');
const output_reducer = require('../Compiler/reducers.js');
const urls_reducer = require('../Bitly/reducers.js');

const { createStore, applyMiddleware, combineReducers } = require('redux');
const thunk = require('redux-thunk').default;

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const AppReducer = combineReducers({
  templates: template_reducer,
  output: output_reducer,
  content: content_reducer,
  urls: urls_reducer,
  errors: error_reducer,
  config: config_reducer,
  uistate: uistate_reducer
});

const defaultState = {
  templates: [],
  output: [],
  content: '',
  errors: [],
  urls: []
};

const store = createStore(AppReducer, defaultState, applyMiddleware(thunk));

module.exports = store;

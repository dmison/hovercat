const {content_reducer} = require('../Content/reducers.js');
const {error_reducer} = require('../Errors/reducers.js');
const {template_reducer} = require('../Template/reducers.js');
const {uistate_reducer} = require('../UIState/reducers.js');

const Redux = require('redux');

const AppReducer = Redux.combineReducers({
  content: content_reducer,
  errors: error_reducer,
  templates: template_reducer,
  uistate: uistate_reducer
});

const defaultState = {
  templates: [],
  content: '',
  errors: [],
  uistate: { 'saved': true, 'wrap': false, 'resourcesPath': '', 'filename': 'untitled' }
};

const store = Redux.createStore(AppReducer, defaultState);

module.exports = store;

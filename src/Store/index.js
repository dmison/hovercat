const {content_reducer} = require('../Content/reducers.js');
const {error_reducer} = require('../Errors/reducers.js');
const {template_reducer} = require('../Template/reducers.js');
const {uistate_reducer} = require('../UIState/reducers.js');
const Redux = require('redux');

// const logger = store => next => action => {
//   console.log('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   return result;
// };


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
  uistate: { 'saved': true, 'saving': false, 'wrap': false, 'resourcesPath': '', 'filename': '', 'active': false, 'height': window.innerHeight-210 }
};

const store = Redux.createStore(AppReducer, defaultState); //, Redux.applyMiddleware(logger));

module.exports = store;

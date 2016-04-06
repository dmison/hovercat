const content_reducers = require('../Content/reducers.js');
const error_reducers = require('../Errors/reducers.js');
const template_reducers = require('../Template/reducers.js');

const Redux = require('redux');

const AppReducer = Redux.combineReducers({
  content: content_reducers.content_reducer,
  errors: error_reducers.error_reducer,
  templates: template_reducers.template_reducer
});

const store = Redux.createStore(AppReducer);

module.exports = store;

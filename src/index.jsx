const React = require('react');
const ReactDOM = require('react-dom');
const {Router, IndexRoute, Route, hashHistory} = require('react-router');
const {Provider} = require('react-redux');
const WorkSpace = require('./WorkSpace');
const TemplateManagerContainer = require('./Template/TemplateManagerContainer.js');
const store = require('./Store');
const {setHeight} = require('./UIState/actions.js');

const App = require('./App.jsx');

ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={WorkSpace} />
      <Route path='manage-templates' component={TemplateManagerContainer} />

    </Route>
  </Router>
</Provider>, document.getElementById('app'));

const dispatchHeight = () => {
  store.dispatch(setHeight(window.innerHeight-153));
};
dispatchHeight();
window.addEventListener('resize', dispatchHeight);


// <Route path='configure' component={ConfigurationContainer} />
// <Route path='send' component={SendEmailContainer} />

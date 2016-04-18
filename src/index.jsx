const React = require('react');
const ReactDOM = require('react-dom');
const {Router, IndexRoute, Route, hashHistory} = require('react-router');
const {Provider} = require('react-redux');
const MainMenuContainer = require('./MainMenu/MainMenuContainer.js');

const WorkSpace = require('./WorkSpace');
const TemplateManagerContainer = require('./Template/TemplateManagerContainer.js');

const store = require('./Store');

const App = (props) => {
  return (
    <div>
      <MainMenuContainer />
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node
};

ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={WorkSpace} />
      <Route path='manage-templates' component={TemplateManagerContainer} />

    </Route>
  </Router>
</Provider>, document.getElementById('app'));


// <Route path='configure' component={ConfigurationContainer} />
// <Route path='send' component={SendEmailContainer} />

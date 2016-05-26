const config_reducer = (state = {}, action) => {

  switch(action.type){
  case 'SET_WRAP':
    return Object.assign( {}, state, { wrap: action.enabled } );
  default:
    return state;
  }

};


module.exports = {
  config_reducer: config_reducer
};

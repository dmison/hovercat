/* global describe it */
const expect = require('chai').expect;
const {default_config, config_reducer} = require('./reducers.js');
const {
  setEditorWrap,
  importConfig,
  setBitlyToken,
  setGmailUsername
} = require('./actions.js');

describe('testing config reducers', function(){

  it('should change the editor wrap value to true', function(){
    const startingState = default_config;
    let expectedEndState = default_config;
    expectedEndState.editor.wrapEnabled = true;
    const actualNewState = config_reducer(startingState, setEditorWrap(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('should change the editor wrap from true to false', function(){
    const startingState = default_config;
    let expectedEndState = default_config;
    expectedEndState.editor.wrapEnabled = false;
    const actualNewState = config_reducer(startingState, setEditorWrap(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('should update gmail username without changing other values', function(){
    const startingState = default_config;
    let expectedEndState = default_config;
    const newUsername = 'new@username.com';
    expectedEndState.email.gmail.username = newUsername;
    const actualNewState = config_reducer(startingState, setGmailUsername(newUsername));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });


  it('dump config from file', function(){
    const incomingConfig = {
      'editor': {
        'wrapEnabled': true
      },
      'bitlyAccessToken': 'randomtokencharacters1234',
      'email':{
        'defaultSender': 'some@email.com',
        'gmail':{
          'username': 'some@email.com',
          'appPassword': 'passwordhere'
        },
        'smtp':{
          'host': 'mail.company.com',
          'port': 25,
          'tls': {
            'rejectUnauthorized': false
          }
        }
      }
    };

    let expectedState = default_config;
    expectedState.editor.wrapEnabled = true;
    expectedState.bitlyAccessToken = 'randomtokencharacters1234';
    expectedState.email.gmail.username = 'some@email.com';
    expectedState.email.gmail.appPassword = 'passwordhere';
    expectedState.email.smtp.host = 'mail.company.com';
    expectedState.email.smtp.port = 25;
    expectedState.email.smtp.tls.rejectUnauthorized = false;

    const actualState = config_reducer(undefined, importConfig(incomingConfig));
    expect(actualState).to.deep.equal(expectedState);
  });


  it('dump partial config from file', function(){
    const incomingConfig = {
      'editor': {
        'wrapEnabled': true
      },
      'bitlyAccessToken': 'randomtokencharacters1234'
    };

    const expectedState = default_config;
    expectedState.editor.wrapEnabled = true;
    expectedState.bitlyAccessToken = 'randomtokencharacters1234';

    const actualState = config_reducer(default_config, importConfig(incomingConfig));

    expect(actualState).to.deep.equal(expectedState);
  });

  it('saving bitly access token', function(){
    const tokenCode = 'randomtokencharacters8453';
    const startingState = default_config;
    let expectedEndState = default_config;
    expectedEndState.bitlyAccessToken = tokenCode;
    const actualNewState = config_reducer(startingState, setBitlyToken(tokenCode));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });


});

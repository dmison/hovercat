/* global describe it */
const expect = require('chai').expect;
const {config_reducer} = require('./reducers.js');
const {
  setEditorWrap,
  importConfig
} = require('./actions.js');

describe('testing config reducers', () => {

  it('set editor wrap to true', ()=>{
    const startingState = {};
    const expectedEndState = { 'editor': {'wrapEnabled': true}};
    const actualNewState = config_reducer(startingState, setEditorWrap(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set editor wrap from true to false', ()=>{
    const startingState = { 'editor': {'wrapEnabled': true}};
    const expectedEndState = { 'editor': {'wrapEnabled': false}};
    const actualNewState = config_reducer(startingState, setEditorWrap(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('dump config from file', ()=>{
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
    const actual = config_reducer({}, importConfig(incomingConfig));
    expect(actual).to.deep.equal(incomingConfig);
  });

  it('dump config from file into partial config', ()=>{
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
    const startingState = {
      'editor': {
        'wrapEnabled': false
      },
      'bitlyAccessToken': 'randomtokencharacters1234'
    };

    const actual = config_reducer(startingState, importConfig(incomingConfig));
    expect(actual).to.deep.equal(incomingConfig);
  });

  it('dump config from file with merge', ()=>{
    const incoming = {
      'editor': {
        'wrapEnabled': true
      },
      'bitlyAccessToken': 'randomtokencharacters1234'
    };
    const starting = {
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
    const expected = {
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

    const actual = config_reducer(starting, importConfig(incoming));
    expect(actual).to.deep.equal(expected);
  });

});

/* global describe it */
const expect = require('chai').expect;
const {uistate_reducer} = require('./reducers.js');
const {
  setSaved,
  setSaving,
  setFilename,
  setResourcesPath,
  setActive,
  setHeight,
  setConsoleHeight,
  setHomeDir
} = require('./actions.js');

describe('testing UI State reducers', () => {

  it('set saved to false', ()=>{
    const startingState = {};
    const expectedEndState = {'saved': false};
    const actualNewState = uistate_reducer(startingState, setSaved(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set saved from false to true', ()=>{
    const startingState = {'saved': false};
    const expectedEndState = {'saved': true};
    const actualNewState = uistate_reducer(startingState, setSaved(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set new filename', ()=>{
    const filename = '/home/username/somefile.hovercat';
    const startingState = {'wrap': true};
    const actualNewState = uistate_reducer(startingState, setFilename(filename));
    expect(actualNewState.filename).to.equal(filename);
  });

  it('change filename', ()=>{
    const filename = '/home/username/somefile.hovercat';
    const startingState = {'wrap': true, 'filename': '/home/username/oldfile.hovercat'};
    const actualNewState = uistate_reducer(startingState, setFilename(filename));
    expect(actualNewState.filename).to.equal(filename);
  });

  it('set resourcesPath', ()=> {
    const path = '/some/path/some/where';
    const startingState = {'wrap': true, 'filename': '/home/username/oldfile.hovercat'};
    const actualNewState = uistate_reducer(startingState, setResourcesPath(path));
    expect(actualNewState.resourcesPath).to.equal(path);
  });

  it('set active to true', ()=>{
    const startingState = {};
    const expectedEndState = {'active': true};
    const actualNewState = uistate_reducer(startingState, setActive(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set active from true to false', ()=>{
    const startingState = {'active': true};
    const expectedEndState = {'active': false};
    const actualNewState = uistate_reducer(startingState, setActive(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set saving to true', ()=>{
    const startingState = {};
    const expectedEndState = {'saving': true};
    const actualNewState = uistate_reducer(startingState, setSaving(true));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('set saved from true to false', ()=>{
    const startingState = {'saving': true};
    const expectedEndState = {'saving': false};
    const actualNewState = uistate_reducer(startingState, setSaving(false));
    expect(actualNewState).to.deep.equal(expectedEndState);
  });

  it('setting height', ()=>{
    const actualNewState = uistate_reducer({}, setHeight(640));
    expect(actualNewState.height).to.equal(640);
  });

  it('set console height', ()=>{
    const actualNewState = uistate_reducer({}, setConsoleHeight(60));
    expect(actualNewState.consoleHeight).to.equal(60);
  });

  it('set home dir', ()=>{
    const homedir = '/home/some/path';
    const actualNewState = uistate_reducer({}, setHomeDir(homedir));
    expect(actualNewState.homeDir).to.equal(homedir);
  });


});

/* global describe it */
const expect = require('chai').expect;
const {template_reducer} = require('./reducers.js');
const {addNewTemplate} = require('./actions.js');
const {updateTemplate} = require('./actions.js');
const {clearOnlyTemplates} = require('./actions.js');
const {importTemplates} = require('./actions.js');


describe('testing template reducers', function(){

  it('add one template', function(){
    const content = 'here is some arbitrary {{content}}.';
    const name = 'basic text';
    const type = 'markdown';

    const actualNewState = template_reducer(undefined, addNewTemplate(name, type, content));

    expect(actualNewState[0].content).to.equal(content);
    expect(actualNewState[0].name).to.equal(name);
    expect(actualNewState[0].type).to.equal(type);

  });

  it('add two template templates', function(){

    const templateOne = 'here is some arbitrary {{content}}.';
    const nameOne = 'text email';
    const typeOne = 'markdown';

    const templateTwo = 'here is some more arbitrary {{content}}.';
    const nameTwo = 'html email';
    const typeTwo = 'html';

    let actualNewTemplates = [];
    actualNewTemplates = template_reducer(actualNewTemplates, addNewTemplate(nameOne, typeOne, templateOne));
    actualNewTemplates = template_reducer(actualNewTemplates, addNewTemplate(nameTwo, typeTwo, templateTwo));

    const expectedNewTemplates = [
      {
        content: templateOne,
        name: nameOne,
        type: typeOne
      },
      {
        content: templateTwo,
        name: nameTwo,
        type: typeTwo
      }

    ];
    actualNewTemplates.forEach(function(template, index){
      expect(template.content).to.equal(expectedNewTemplates[index].content);
      expect(template.name).to.equal(expectedNewTemplates[index].name);
      expect(template.type).to.equal(expectedNewTemplates[index].type);

    });

  });

  it('updated tempate name', function(){

    const id = '234-235-235-235-235-222';
    const template = 'here is some arbitrary {{content}}.';
    const name = 'basic text';
    const type = 'markdown';

    const startingTemplates = [
      {
        id: id,
        content: template,
        name: name,
        type: type
      }
    ];

    const newName = 'text email';

    const actualUpdatedTemplates = template_reducer(startingTemplates, updateTemplate(id, newName));
    expect(actualUpdatedTemplates[0].content).to.equal(template);
    expect(actualUpdatedTemplates[0].name).to.equal(newName);
    expect(actualUpdatedTemplates[0].type).to.equal(type);
    expect(actualUpdatedTemplates[0].id).to.equal(id);

  });

  it('updated tempate type', function(){

    const id = '234-235-235-235-235-222';
    const template = 'here is some <b>arbitrary</b> {{content}}.';
    const name = 'basic text';
    const type = 'markdown';

    const startingTemplates = [
      {
        id: id,
        content: template,
        name: name,
        type: type
      }
    ];

    const newType = 'html';

    const actualUpdatedTemplates = template_reducer(startingTemplates, updateTemplate(id, name, newType));
    expect(actualUpdatedTemplates[0].content).to.equal(template);
    expect(actualUpdatedTemplates[0].name).to.equal(name);
    expect(actualUpdatedTemplates[0].type).to.equal(newType);
    expect(actualUpdatedTemplates[0].id).to.equal(id);

  });

  it('clear all templates', function(){

    const templateOne = {
      id: '234-235-235-235-235-222',
      content: 'here is some arbitrary {{content}}.',
      name: 'template two',
      type: 'markdown'
    };
    const templateTwo = {
      id: '493-235-746-235-255',
      content: 'here is some other arbitrary {{content}}.',
      name: 'template one',
      type: 'markdown'
    };

    const startingTemplates = [ templateOne, templateTwo ];

    const actualUpdatedTemplates = template_reducer(startingTemplates, clearOnlyTemplates());
    expect(actualUpdatedTemplates.length).to.equal(0);
    expect(actualUpdatedTemplates).to.deep.equal([]);
  });

  it('import some templates', function(){

    const templateOne = {
      id: '234-235-235-235-235-222',
      content: 'here is some arbitrary {{content}}.',
      name: 'template two',
      type: 'markdown',
    };
    const templateTwo = {
      id: '493-235-746-235-255',
      content: 'here is some other arbitrary {{content}}.',
      name: 'template one',
      type: 'markdown',
    };

    const templatesToImport = [ templateOne, templateTwo ];
    const startingTemplates = [];

    const actualUpdatedTemplates = template_reducer(startingTemplates, importTemplates(templatesToImport));
    expect(actualUpdatedTemplates).to.deep.equal(templatesToImport);
  });

  it('import some templates without IDs', function(){

    const templateOne = {
      id: '234-235-235-235-235-222',
      content: 'here is some arbitrary {{content}}.',
      name: 'template two',
      type: 'markdown'
    };
    const templateTwo = {
      content: 'here is some other arbitrary {{content}}.',
      name: 'template one',
      type: 'markdown'
    };

    const templatesToImport = [ templateTwo ];
    const startingTemplates = [ templateOne ];

    const actualUpdatedTemplates = template_reducer(startingTemplates, importTemplates(templatesToImport));
    expect(actualUpdatedTemplates.length).to.equal(2);
    actualUpdatedTemplates.forEach(function(template){
      expect(template.id).to.not.be.undefined;
    });
  });


});

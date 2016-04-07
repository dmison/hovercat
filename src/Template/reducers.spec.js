/* global describe it */
const expect = require('chai').expect;
const reducers = require('./reducers.js');
const actions = require('./actions.js');

describe('testing template reducers', () => {

  it('add one template', ()=>{
    const template = 'here is some arbitrary {{content}}.';
    const name = 'basic text';
    const type = 'TEXT';

    const actualNewTemplates = reducers.template_reducer(undefined, actions.addTemplate(name, type, template));
    expect(actualNewTemplates[0].content).to.equal(template);
    expect(actualNewTemplates[0].name).to.equal(name);
    expect(actualNewTemplates[0].type).to.equal(type);

  });

  it('add two template templates', ()=>{

    const templateOne = 'here is some arbitrary {{content}}.';
    const nameOne = 'text email';
    const typeOne = 'TEXT';

    const templateTwo = 'here is some more arbitrary {{content}}.';
    const nameTwo = 'html email';
    const typeTwo = 'HTML';

    let actualNewTemplates = [];
    actualNewTemplates = reducers.template_reducer(actualNewTemplates, actions.addTemplate(nameOne, typeOne, templateOne));
    actualNewTemplates = reducers.template_reducer(actualNewTemplates, actions.addTemplate(nameTwo, typeTwo, templateTwo));

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
    actualNewTemplates.forEach((template, index)=>{
      expect(template.content).to.equal(expectedNewTemplates[index].content);
      expect(template.name).to.equal(expectedNewTemplates[index].name);
      expect(template.type).to.equal(expectedNewTemplates[index].type);

    });

  });

  it('updated tempate name', ()=>{

    const id = '234-235-235-235-235-222';
    const template = 'here is some arbitrary {{content}}.';
    const name = 'basic text';
    const type = 'TEXT';

    const startingTemplates = [
      {
        id: id,
        content: template,
        name: name,
        type: type
      }
    ];

    const newName = 'text email';

    const actualUpdatedTemplates = reducers.template_reducer(startingTemplates, actions.updateTemplate(id, newName));
    expect(actualUpdatedTemplates[0].content).to.equal(template);
    expect(actualUpdatedTemplates[0].name).to.equal(newName);
    expect(actualUpdatedTemplates[0].type).to.equal(type);
    expect(actualUpdatedTemplates[0].id).to.equal(id);

  });

  it('updated tempate type', ()=>{

    const id = '234-235-235-235-235-222';
    const template = 'here is some <b>arbitrary</b> {{content}}.';
    const name = 'basic text';
    const type = 'TEXT';

    const startingTemplates = [
      {
        id: id,
        content: template,
        name: name,
        type: type
      }
    ];

    const newType = 'HTML';

    const actualUpdatedTemplates = reducers.template_reducer(startingTemplates, actions.updateTemplate(id, name, newType));
    expect(actualUpdatedTemplates[0].content).to.equal(template);
    expect(actualUpdatedTemplates[0].name).to.equal(name);
    expect(actualUpdatedTemplates[0].type).to.equal(newType);
    expect(actualUpdatedTemplates[0].id).to.equal(id);

  });

  it('delete a template', ()=>{

    const templateOne = {
      id: '234-235-235-235-235-222',
      content: 'here is some arbitrary {{content}}.',
      name: 'template two',
      type: 'TEXT'
    };
    const templateTwo = {
      id: '493-235-746-235-255',
      content: 'here is some other arbitrary {{content}}.',
      name: 'template one',
      type: 'TEXT'
    };

    const startingTemplates = [ templateOne, templateTwo ];

    const actualUpdatedTemplates = reducers.template_reducer(startingTemplates, actions.deleteTemplate(templateOne.id));
    expect(actualUpdatedTemplates.length).to.equal(1);
    expect(actualUpdatedTemplates[0]).to.deep.equal(templateTwo);
  });


});

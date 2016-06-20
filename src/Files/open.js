const fs = require('fs');

const openFile = (filename, callback) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      var dataInput = {};
      try {
        dataInput = JSON.parse(data);
        // update data from V1 files to V2 format
        if (isV1Format(dataInput)){
          dataInput = convertV1ToV2(dataInput);
        }
        callback(null, dataInput);
      } catch (e) {
        callback(e.message, null);
      }
    }
  });
};

var isV1Format = (data) => {
  // no templates
  const noTemplates = typeof data.templates === 'undefined';
  // gfmTemplate exists
  const gotGfmTemplate = typeof data.gfmTemplate !== 'undefined';
  // htmlTemplate exists
  const gotHTMLTemplate = typeof data.htmlTemplate !== 'undefined';

  return noTemplates && gotHTMLTemplate && gotGfmTemplate;
};

var convertV1ToV2 = (data) => {
  const output = Object.assign({}, data);

  delete output.gfmTemplate;
  delete output.htmlTemplate;

  output.templates = [
    {
      name: 'Text Email',
      content: data.gfmTemplate,
      type: 'markdown',
      order: 2
    },
    {
      name: 'HTML Email',
      content: data.htmlTemplate,
      type: 'html',
      order: 1
    }
  ];

  return output;
};

module.exports = {
  openFile: openFile,
  isV1Format: isV1Format,
  convertV1ToV2: convertV1ToV2
};

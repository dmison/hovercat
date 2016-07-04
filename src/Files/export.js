const fs = require('fs');
const path = require('path');

const exportFile = (filename, content, callback) => {

  fs.writeFile(filename, content, (err) => {
    if (err) {
      callback(err, filename);
    } else {
      callback(null, filename);
    }
  });

};

const exportFiles = (path, files, callback) => {
  let results = [];

  files.forEach((file)=>{
    exportFile(makeFilename(path, file.name, file.type), file.output, (err,filename)=>{
      results = results.concat({ id: file.id, name: filename, err: err });
      if (results.length === files.length) {
        callback(results);
      }
    });
  });

};

const makeFilename = (path, name, type) => {
  return `${path}/${underline(name)}-export.${extension(type)}`;
};

const underline = (content) => {
  return content.replace(' ','_');
};

const extension = (type) => {
  switch(type){
  case 'markdown': {
    return 'txt';
  }
  case 'html': {
    return 'html';
  }
  }
};

module.exports = {
  exportFiles: exportFiles,
  exportFile: exportFile,
  makeFilename: makeFilename,
  underline: underline
};

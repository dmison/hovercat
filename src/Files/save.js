const fs = require('fs');
const path = require('path');

var saveFile = function(filename, fileout, done) {
  const finalFilename = ensureExtension(filename);
  fs.writeFile(finalFilename, JSON.stringify(fileout, null, 2), function(err) {
    if (err) {
      done('File save failed: ' + err, null);
    } else {
      done(null, finalFilename);
    }
  });
};

var ensureExtension = (filename) => {
  return path.extname(filename) === '.hovercat'? filename : `${filename}.hovercat`;
};

module.exports = {
  saveFile: saveFile,
  ensureExtension: ensureExtension
};

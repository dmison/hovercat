const fs = require('fs');

var openFile = function(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      var dataInput = {};
      try {
        dataInput = JSON.parse(data);
        callback(null, dataInput);
      } catch (e) {
        callback(e.message, null);
      }
    }
  });
};


module.exports = {
  openFile: openFile
};

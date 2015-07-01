(function(){


  var saveFile = function(filename, fileout, done) {
    fs.writeFile(filename, JSON.stringify(fileout), function(err) {
      if (err) {
        done('File save failed: ' + err);
      } else {
        done();
      }
    });
  };

  var openFile = function(filename, callback) {
    fs.readFile(filename, function(err, data) {
      if (err) {
        callback({
          error: err
        });
      } else {
        var dataInput = {};
        try {
          dataInput = JSON.parse(data);
        } catch (e) {
          dataInput = {
              error: e.message
          };
        }

        callback(dataInput);

      }
    });
  };

  var exportFiles = function(filename, textOut, htmlOut, callback) {

    fs.writeFile(filename + '.txt', textOut, function(err) {
      if (err) {
        callback(err);
      } else {
        fs.writeFile(filename + '.html', htmlOut, function(err) {
          if (err) {
            callback(err);
          } else {
            callback();
          }
        });
      }
    });

  };

  module.exports = {
    saveFile: saveFile,
    openFile: openFile,
    exportFiles: exportFiles
  };

})();

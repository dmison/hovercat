(function(){
  var path = require('path');
  var fs = require('fs');

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

  var writeConfigFile = function(config, configfilepath, done){
    console.log("writing");
    // turn config into YAML
    var output = YAML.stringify(config, 4);
    var options = { flag: 'w' };

    var configDir = path.dirname(configfilepath);

    //does directory exist?
    fs.access(configDir, fs.F_OK, function(err){
      //no: mkdir
      if(err){
        console.log('making dir: %s', configDir)
        fs.mkdir(configDir);
      }
      //yes: can it be written to?
      // yes: write File
      // no: error

      fs.writeFile(configfilepath, output, options, function(err) {
        if (err) {
          done('File save failed: ' + err);
        } else {
          done(config);
        }
      });

    });

  };

  // if ~/.hovercat exists then read & return JSON, otherwise create
  // done(config json)
  var readConfigFile = function(defaultConfig, configfilepath, done){
    if (configfilepath === ''){
      console.log('no filename specified for config');
      return;
    }
    fs.access(configfilepath, fs.F_OK | fs.W_OK | fs.R_OK, function(error){

      if (error){
        writeConfigFile(defaultConfig, configfilepath, done);
      } else {

        fs.readFile(configfilepath, 'utf-8', function(err, data) {

          if (err) {
            console.log("failed to read config\n%s", err)
          } else {
            var loadedConfig = {};
            // parse YAML to JSON
            try {
              loadedConfig = YAML.parse(data);
            } catch(e){
              console.log("yaml parse error: %s", e)
              loadedConfig = {}
            }
            done(loadedConfig)
          }
        });
      }
    });

  };

  module.exports = {
    saveFile: saveFile,
    openFile: openFile,
    readConfigFile: readConfigFile,
    writeConfigFile: writeConfigFile,
    exportFiles: exportFiles
  };

})();

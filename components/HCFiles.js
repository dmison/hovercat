/* global YAML */
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

    // turn config into YAML
    var output = YAML.stringify(config, 4);
    var options = { flag: 'w' };

    var configDir = path.dirname(configfilepath);

    //does directory exist?
    fs.access(configDir, fs.F_OK, function(err){
      //no: mkdir
      if(err){
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

  // if config file exists then read & return JSON, otherwise create
  // done(config json)
  var readConfigFile = function(defaultConfig, configfilepath, done){
    if (configfilepath === ''){
      // no filename specified for config yet - ie got called before state
      // populated so just return 
      return;
    }
    fs.access(configfilepath, fs.F_OK | fs.W_OK | fs.R_OK, function(error){

      if (error){
        writeConfigFile(defaultConfig, configfilepath, done);
      } else {

        fs.readFile(configfilepath, 'utf-8', function(err, data) {

          if (err) {
            alert('failed to read config\n%s', err);
          } else {
            var loadedConfig = {};
            // parse YAML to JSON
            try {
              loadedConfig = YAML.parse(data);
            } catch(e){
              alert('yaml parse error: %s', e);
              loadedConfig = {};
            }

            loadedConfig = _mergeRecursive(loadedConfig, defaultConfig);
            done(loadedConfig);
          }
        });
      }
    });

  };

  // http://stackoverflow.com/questions/21450060/how-to-join-two-json-object-in-javascript-without-using-jquery
  var _mergeRecursive = function(destObj, sourceObj) {

    //iterate over all the properties in the object which is being consumed
    for (var p in sourceObj) {
      // Property in destination object set; update its value.
      if ( sourceObj.hasOwnProperty(p) && typeof destObj[p] !== 'undefined' ) {
        _mergeRecursive(destObj[p], sourceObj[p]);
      } else {
        //We don't have that level in the heirarchy so add it
        destObj[p] = sourceObj[p];
      }
    }
    return destObj;
  };

  module.exports = {
    saveFile: saveFile,
    openFile: openFile,
    readConfigFile: readConfigFile,
    writeConfigFile: writeConfigFile,
    exportFiles: exportFiles
  };

})();

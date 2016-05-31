const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

const writeConfigFile = (config, homeDir, done) => {
  const configfilepath = `${homeDir}/.hovercat/config.yaml`;
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
        done(err, null);
      } else {
        done(null, config);
      }
    });

  });

};

const migrateConfigFile = (homedir) => {
  const newfile = `${homedir}/.hovercat/config.yaml`;
  const oldfile = `${homedir}/.hovercraft/config.yaml`;

  try {
    fs.accessSync(oldfile, fs.F_OK);
  } catch (e) {
    return;
  }

  try {
    fs.accessSync(newfile, fs.F_OK);
  } catch (e) {
    fs.mkdirSync(`${homedir}/.hovercat`);
    fs.renameSync(oldfile, newfile);
  }
};

// if config file exists then read & return JSON, otherwise create
// done(config json)
var readConfigFile = (defaultConfig, homeDir, done)=>{
  if (homeDir === ''){
    // no filename specified for config yet - ie got called before state
    // populated so just return
    return;
  }

  const configfilepath = `${homeDir}/.hovercat/config.yaml`;
  migrateConfigFile(homeDir);

  fs.access(configfilepath, fs.F_OK | fs.W_OK | fs.R_OK, (error)=>{
    if (error){
      writeConfigFile(defaultConfig, homeDir, done);
    } else {

      fs.readFile(configfilepath, 'utf-8', (err, data)=>{
        if (err) {
          done(err, null);
        } else {
          var loadedConfig = {};
          // parse YAML to JSON
          try {
            loadedConfig = YAML.parse(data);
          } catch(e){
            done(e,null);
            loadedConfig = {};
          }

          loadedConfig = _mergeRecursive(loadedConfig, defaultConfig);
          done(null, loadedConfig);
        }
      });
    }
  });

};

// http://stackoverflow.com/questions/21450060/how-to-join-two-json-object-in-javascript-without-using-jquery
var _mergeRecursive = (destObj, sourceObj) => {

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
  readConfigFile: readConfigFile,
  writeConfigFile: writeConfigFile
};

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

  module.exports = {
    saveFile: saveFile
  };

})();

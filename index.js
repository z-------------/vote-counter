var fs = require("fs");
var path = require("path");

fs.readdir(path.join(__dirname, "lib"), function(err, filenames) {
  if (err) throw err;

  for (let i = 0; i < filenames.length; i++) {
    var filename = filenames[i];
    var fileExtension = filename.substring(filename.length - 3).toLowerCase();
    var filenameNoExtension = filename.substring(0, filename.length - 3);

    if (fileExtension === ".js") {
      module.exports[filenameNoExtension] = require(path.join(__dirname, "lib", filename)).count;
    }
  }
});

module.exports.libDir = function() { return path.join(__dirname, "lib") };

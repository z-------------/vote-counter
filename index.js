var fs = require("fs");
var path = require("path");

const COUNTING_METHOD_NAMES = [ "fptp", "ir" ];

var countingMethods = {};

for (let i = 0; i < COUNTING_METHOD_NAMES.length; i++) {
  var name = COUNTING_METHOD_NAMES[i];
  var filePath = path.join(__dirname, "lib", `${name}.js`);

  countingMethods[name] = require(filePath).count;
}

module.exports.count = function(countingMethod, candidatesCount, ballots) {
  if (countingMethods.hasOwnProperty(countingMethod) === true) {
    return countingMethods[countingMethod](candidatesCount, ballots);
  } else {
    throw new ReferenceError();
  }
}

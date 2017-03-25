exports.count = function(candidatesCount, ballots) {
  console.log(candidatesCount, ballots);
  if (Number.isInteger(candidatesCount) === false) {
    throw new TypeError("Argument 0 must be a Number");
  } else if (Array.isArray(ballots) === false) {
    throw new TypeError("Argument 1 must be an Array");
  }

  // set up sums array

  var counts = [];
  for (let i = 0; i < candidatesCount; i++) {
    counts[i] = 0;
  }

  // start the counting

  for (let i = 0; i < ballots.length; i++) {
    var ballot = ballots[i];
    if (ballot.length !== candidatesCount) {
      throw new RangeError(`Each ballot must have length equal to Argument 0 (${candidatesCount.toString()})`);
    }

    for (let j = 0; j < ballot.length; j++) {
      if (ballot[j] === 1) {
        counts[j] += 1;
        break;
      }
    }
  }

  // return result

  var result = {};

  (function() {
    var highestCount = 0;
    var tie = false;
    var tiedCandidates = [];
    var winner = null;

    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > highestCount) {
        highestCount = counts[i];
        winner = i;
        tie = false;
      } else if (counts[i] === highestCount) {
        tie = true;
        winner = null;
      }
    }

    if (tie === true) {
      for (let i = 0; i < counts.length; i++) {
        if (counts[i] === highestCount) {
          tiedCandidates.push(i);
        }
      }

      result.tie = true;
      result.tiedCandidates = tiedCandidates;
    } else {
      result.tie = false;
      result.winner = winner;
    }
  }());

  return result;
};

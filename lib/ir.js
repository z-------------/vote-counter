/*

  ir.js

  Instant-runoff
  ==============
  https://en.wikipedia.org/wiki/Instant-runoff_voting

*/

exports.count = function(candidatesCount, ballots) {
  if (Number.isInteger(candidatesCount) === false) {
    throw new TypeError("Argument 0 must be a Number");
  } else if (Array.isArray(ballots) === false) {
    throw new TypeError("Argument 1 must be an Array");
  }

  /* set up sums array */

  var counts = [];
  for (let i = 0; i < candidatesCount; i++) {
    counts[i] = 0;
  }

  /* set up array of eliminated canidates */

  var eliminatedCandidates = [];

  /* ballots buffer for distributing votes */

  var ballotsBuffer = ballots.slice(); // duplicate

  /* start the counting */

  for (let r = 0; r < candidatesCount; r++) { // round
    for (let i = 0; i < ballotsBuffer.length; i++) { // ballot
      var ballot = ballotsBuffer[i];
      if (ballot.length !== candidatesCount) {
        throw new RangeError(`Each ballot must have length equal to Argument 0 (${candidatesCount.toString()})`);
      }

      for (let j = 0; j < candidatesCount; j++) { // markings on ballot
        if (ballot[j] === 1 && eliminatedCandidates.indexOf(j) === -1) {
          counts[j] += 1;
          break;
        }
      }
    }

    /* check if anyone has majority */

    for (let c = 0; c < candidatesCount; c++) {
      if (counts[c] >= ballotsBuffer.length) {
        return {
          winner: c
        } // if majority found, the loop ends here and winner is returned. otherwise, continue.
      }
    }

    /* if no majority, eliminate last-place candidate and distribute their ballots */

    var lastPlaceCandidate = 0;
    for (let i = 1; i < candidatesCount; i++) {
      if (counts[i] < counts[lastPlaceCandidate]) {
        lastPlaceCandidate = i;
      }
    }

    eliminatedCandidates.push(lastPlaceCandidate); // eliminate

    for (let i = 0; i < ballotsBuffer.length; i++) { // distribute
      var ballot = ballotsBuffer[i];
      if (ballot[lastPlaceCandidate] === 1) {
        for (let j = 0; j < candidatesCount; j++) {
          if (j === lastPlaceCandidate) {
            ballotsBuffer[i][j] = 0;
          } else if (ballotsBuffer[i][j] !== 0) {
            ballotsBuffer[i][j] += 1;
          }
        }
      }
    }

    /* now go to round 2 */
  }

  /* if we are still running here, then there must be a tie */
  return {
    tie: true
  };
};

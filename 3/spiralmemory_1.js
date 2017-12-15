// Required to read from stdin and output to stdout
let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

rl.on("line", handleLine);

function handleLine(line) {

  let num = parseInt(line);

  // Edge case
  if (num === 1) {
    console.log(0);
    rl.close();
    return;
  }

  // Find distance from ring to centre
  // We find the ring that num belongs to based on the nearest odd square root
  let nearestSquare = Math.ceil(Math.sqrt(num));
  let nearestOddSquare = 2 * Math.floor(nearestSquare/2) + 1;
  let distXToCentre = (nearestOddSquare - 1)/2;

  // Find shortest distance from num to the middle of the ring
  let ringSize = Math.pow(nearestOddSquare, 2) - Math.pow(nearestOddSquare - 2, 2);
  let distToX = (num - Math.pow(nearestOddSquare - 2, 2) - distXToCentre) % (ringSize/4);

  console.log(distXToCentre + distToX);
  rl.close();
}
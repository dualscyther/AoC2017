// Required to read from stdin and output to stdout
let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

let checksum = 0;
rl.on("line", handleLine);
rl.on("close", () => console.log(checksum));

// Assume every row has one exact pair of numbers
function handleLine(line) {

  let nums = line.split("\t").map((s) => parseInt(s));
  // Normal for loops would've been better, this is probably harder to read
  // lesson learned I guess
  nums.forEach((a, i) => {
    nums.forEach((b, j) => {
      if (a % b === 0 && i !== j) {
        checksum += a/b;
      }
    });
  });
}
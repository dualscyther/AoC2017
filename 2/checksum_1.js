// I'm sure this is way too many lines but I have no idea how to js

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

// Functions are hoisted in js so no need to declare earlier
function handleLine(line) {

  nums = line.split("\t").map((s) => parseInt(s));
  let min;
  let max;
  nums.forEach((num) => {
    if (num < min || min === undefined) {
      min = num;
    }
    if (num > max || max === undefined) {
      max = num;
    }
  });

  checksum += max - min;
}
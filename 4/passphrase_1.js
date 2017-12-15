let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

let validPasses = 0;
rl.on("line", handleLine);
rl.on("close", () => console.log(validPasses));

function handleLine(line) {

  let words = line.split(" ");
  words.sort();
  for (let i = 0; i < words.length; ++i) {
    if (words[i] === words[i+1]) {
      return;
    }
  }

  ++validPasses;
}
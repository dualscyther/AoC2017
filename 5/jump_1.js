let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

let jumpList = [];
rl.on("line", (line) => jumpList.push(parseInt(line, 10)));
rl.on("close", () => traverseList(jumpList));

function traverseList(list) {

  let steps = 0;
  let i = 0;
  while (i >= 0 && i < list.length) {
    ++list[i];
    i += list[i] - 1;
    ++steps;
  }
  
  console.log(steps);
}
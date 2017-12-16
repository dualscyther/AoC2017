// A simple, naive implementation

let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

rl.on("line", handleLine);

function handleLine(line) {

  let banks = line.split("\t").map((c) => parseInt(c));
  let banksHist = [banks.slice()];
  let count = 0;
  while (true) {
    
    ++count;
    // Find index and bank with the most "blocks"
    let bankIndex = 0;
    let max = 0;
    for (let i = 0; i < banks.length; ++i) {
      if (banks[i] > max) {
        max = banks[i];
        bankIndex = i;
      }
    }

    banks[bankIndex] = 0;
    bankIndex = (bankIndex + 1) % banks.length;

    // Redistribute
    for (let blocksLeft = max; blocksLeft > 0; --blocksLeft) {
      ++banks[bankIndex];
      bankIndex = (bankIndex + 1) % banks.length;
    }

    // Check against previous states
    let stringBanks = banks.join();
    for (let i = 0; i < banksHist.length; ++i) {
      let prevState = banksHist[i];
      if (prevState.join() === stringBanks) {
        console.log(count - i);
        return;
      }
    }

    banksHist.push(banks.slice());
  }
}
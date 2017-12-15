let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

rl.on("line", handleLine);

function handleLine(line) {

  let num = parseInt(line);

  let nearestSquare = Math.ceil(Math.sqrt(num));
  let UpperOddSquare = 2 * Math.floor(nearestSquare/2) + 3;

  // Allocate array of "memory" as large as the input + 1 ring
  let grid = create2dArray(UpperOddSquare, UpperOddSquare);
  // Initialize grid and current position
  let x = Math.floor(UpperOddSquare/2);
  let y = x;
  let currentVal = 1;
  grid[x][y] = 1;
  // Initial direction doesn't actually matter, make it down so that the first
  // iteration makes us go to the right to be consistent with the example
  let dirIndex = 3;

  let dirLookup = [
    {x: 1, y: 0} , 
    {x: 0, y: 1} ,
    {x: -1, y: 0},
    {x: 0, y: -1}
  ];
  // Test while generating each stress test value
  while (currentVal <= num) {
    // Move cursor
    let xLeft = x + dirLookup[(dirIndex + 1) % 4].x;
    let yLeft = y + dirLookup[(dirIndex + 1) % 4].y;
    if (grid[xLeft][yLeft] === 0) {
      dirIndex = (dirIndex + 1) % 4;
    }
    x = x + dirLookup[dirIndex].x;
    y = y + dirLookup[dirIndex].y;

    //@todo make this not as hacky
    // grid[x][y] = grid[x-1].slice(y-1, y+2).reduce((rowSum, v) => rowSum + v,0);
    grid[x][y] = grid[x-1][y-1] + grid[x-1][y] + grid[x-1][y+1] +
                  grid[x][y-1] + grid[x][y+1] +
                  grid[x+1][y-1] + grid[x+1][y] + grid[x+1][y+1];
    currentVal = grid[x][y];
  }
  

  console.log(currentVal);
  rl.close();
}

function create2dArray(columns, rows) {

  let matrix = [...Array(columns).keys()].map(() => new Array(rows));
  matrix.forEach((a) => a.fill(0));
  return matrix;
} 
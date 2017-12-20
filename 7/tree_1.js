// A simple, naive implementation

let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  // Don't echo
  terminal: false
});

let tree = {};

rl.on("line", function (line) {
  let words = line.replace(/,/g, "").split(" ");

  if (!(words[0] in tree)) {
    tree[words[0]] = {"children": [], "parent": null};
  }

  for (let i = 3; i < words.length; ++i) {
    tree[words[0]]["children"].push(words[i]);

    if (!(words[i] in tree)) {
      tree[words[i]] = {"children": [], "parent": null};
    }
    tree[words[i]]["parent"] = words[0];
  }
});

rl.on("close", function () {
  let root = null;

  for (let key in tree) {
    if (tree.hasOwnProperty(key)) {
      if (tree[key].parent === null) {
        console.log(key);
        root = key;
        return;
      }
    }
  }
});
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
  tree[words[0]].weight = eval(words[1]);

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
        root = key;
        break;
      }
    }
  }

  // Run a modified post order traversal to calculate weights
  countWeight(root, tree);
});

/**
 * 
 * @param {string} node key of the node in @param tree
 * @param {object} tree object which stores the tree structure
 * @returns {array} An array of strings - the string names of the nodes which
 *  are unbalanced. This array will be of length 0 or 1, unless the
 *  unbalanced node only has 1 sibling, in which case it is hard to determine
 *  which sibling is the unbalanced node.
 * 
 *  Disclaimer this code is disgusting - I wish I didn't hack this so hard
 */
function countWeight (node, tree) {

  let totalWeight = tree[node].weight;
  let unbalancedChild = null;
  let unbalancedGChildren = null;
  for (let child of tree[node].children) {
    let unbalancedChildrenOfChild = countWeight(child, tree);
    if (unbalancedChildrenOfChild.length === 2) {
      unbalancedGChildren = unbalancedChildrenOfChild;
      unbalancedChild = child;
    }
    totalWeight += tree[child].subtreeWeight;
  }
  tree[node].subtreeWeight = totalWeight;

  // Handle a child having 2 children, 1 of which is unbalanced
  if (unbalancedChild !== null) {
    let mode = null;
    for (let child of tree[node].children) {
      if (child != unbalancedChild) {
        mode = tree[child].subtreeWeight;
      }
    }

    let weightDiff = mode - tree[unbalancedChild].subtreeWeight;
    if (tree[unbalancedGChildren[0]].subtreeWeight + weightDiff === tree[unbalancedGChildren[1]].subtreeWeight) {
      console.log(tree[unbalancedGChildren[0]].weight + weightDiff);
    }
    else {
      console.log(tree[unbalancedGChildren[1]].weight + weightDiff);
    }
    process.exit(0);
  }

  // Else proceed as normal
  let mode = null;
  let weightCounts = {};
  for (let child of tree[node].children) {
    if (weightCounts[tree[child].subtreeWeight] === undefined) { 
      weightCounts[tree[child].subtreeWeight] = 0;
    }
    ++weightCounts[tree[child].subtreeWeight];
    if (mode === null || 
                weightCounts[tree[child].subtreeWeight] > weightCounts[mode]) {
      mode = tree[child].subtreeWeight;
    }
  }

  console.log(weightCounts);
  for (let child of tree[node].children) {
    if (tree[child].subtreeWeight !== mode) {
      if (tree[node].children.length === 2) {
        return (tree[node].children);
      }
      else {
        console.log("Wrong weight node =", child);
        console.log("Normal subtree weight =", mode);
        console.log(child, "subtree weight =", tree[child].subtreeWeight);
        console.log(child, "weight =", tree[child].weight);
        console.log("Required weight =", tree[child].weight + 
                                             (mode - tree[child].subtreeWeight));
        process.exit(0);
      }
    }
  }

  return [];
}
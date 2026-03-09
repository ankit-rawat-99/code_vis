const express = require("express");
const cors = require("cors");
const stack = require("./engine/stack");
const queue = require("./engine/queue");
const array = require("./engine/array");
const searching = require("./engine/searching");
const sorting = require("./engine/sorting");
const dp = require("./engine/dp");
const graph = require("./engine/graph");
const tree = require("./engine/tree");


const app = express();
app.use(cors());
app.use(express.json());

const engines = {
  bubbleSort: sorting.bubbleSort,
  selectionSort: sorting.selectionSort,
  insertionSort: sorting.insertionSort,
  mergeSort: sorting.mergeSort,
  quickSort: sorting.quickSort,
  dijkstra: graph.dijkstra,
  stack: stack.run,
  queue: queue.run,
  array: array.run,
  binarySearch: searching.binarySearch,
  fibonacciDP: dp.fibonacciDP,
  knapsackDP: dp.knapsackDP,
  lcsDP: dp.lcsDP,
  bfs: graph.bfs,
  dfs: graph.dfs,
 inorderTree: tree.inorder,
 inorderTree: tree.inorder,
preorderTree: tree.preorder,
postorderTree: tree.postorder,
};

app.post("/run", (req, res) => {
  const { type, input } = req.body;

  if (!engines[type]) {
    return res.status(400).json({ error: "Invalid algorithm type" });
  }

  const states = engines[type](input);
  res.json({ states });
});

app.listen(5000, () => console.log("Server running on port 5000"));

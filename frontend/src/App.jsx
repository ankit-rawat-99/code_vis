import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SortingVisualizer from "./visualizers/SortingVisualizer";
import StackVisualizer from "./visualizers/StackVisualizer";
import QueueVisualizer from "./visualizers/QueueVisualizer";
import ArrayVisualizer from "./visualizers/ArrayVisualizer";
import DPVisualizer from "./visualizers/DPVisualizer";
import KnapsackVisualizer from "./visualizers/KnapsackVisualizer";
import LCSVisualizer from "./visualizers/LCSVisualizer";
import GraphVisualizer from "./visualizers/GraphVisualizer";
import TreeVisualizer from "./visualizers/TreeVisualizer";
import DijkstraVisualizer from "./visualizers/DijkstraVisualizer";
import CodeViewer from "./components/CodeViewer";
import LinkedListVisualizer from "./visualizers/LinkedListVisualizer";
const parseWeightedGraph = (inputText) => {

  const graph = {};

  inputText.split("\n").forEach(line => {

    const [node, neighbors] = line.split(":");
    const trimmedNode = node.trim();

    graph[trimmedNode] = [];

    if (neighbors) {

      neighbors.split(",").forEach(entry => {

        if (!entry.trim()) return;

        const match = entry.match(/(\d+)\((\d+)\)/);

        if (match) {
          graph[trimmedNode].push({
            node: Number(match[1]),
            weight: Number(match[2])
          });
        }
      });
    }
  });

  return graph;
};


function App() {

  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [states, setStates] = useState([]);
  const [step, setStep] = useState(0);
  const [dpAlgorithm, setDpAlgorithm] = useState("fibonacci");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
const [treeTraversal, setTreeTraversal] = useState("inorder");
  const intervalRef = useRef(null);

//runAlgorithm
  const runAlgorithm = async () => {

    let input;
    let typeToSend = algorithm;

    if (algorithm.includes("Sort")) {
      input = [5, 2, 8, 1, 3, 7];
    }

    else if (algorithm === "stack") {
      input = [
        { type: "push", value: 10 },
        { type: "push", value: 20 },
        { type: "push", value: 30 },
        { type: "pop" }
      ];
    }

    else if (algorithm === "dp") {

      if (dpAlgorithm === "fibonacci") {
        input = 7;
        typeToSend = "fibonacciDP";
      }

      else if (dpAlgorithm === "knapsack") {
        input = {
          weights: [1, 3, 4, 5],
          values: [1, 4, 5, 7],
          capacity: 7
        };
        typeToSend = "knapsackDP";
      }

      else if (dpAlgorithm === "lcs") {
        input = {
          str1: "ABCBDAB",
          str2: "BDCABA"
        };
        typeToSend = "lcsDP";
      }
    }else if (algorithm === "bfs" || algorithm === "dfs") {

  input = {
    graph: {
      0: [1, 2],
      1: [3],
      2: [3, 4],
      3: [],
      4: []
    },
    start: 0
  };

  typeToSend = algorithm;
}else if (algorithm === "dijkstra") {

  input = {
    graph: {
      0: [{ node: 1, weight: 4 }, { node: 2, weight: 1 }],
      1: [{ node: 3, weight: 1 }],
      2: [{ node: 1, weight: 2 }, { node: 3, weight: 5 }],
      3: []
    },
    start: 0
  };

  typeToSend = "dijkstra";
// }else if (algorithm === "tree") {

//   input = {
//     values: [50, 30, 70, 20, 40, 60, 80]
//   };

//   typeToSend = "inorderTree";
//
 }
else if (algorithm === "tree") {

  input = {
    values: [50, 30, 70, 20, 40, 60, 80]
  };

  if (treeTraversal === "inorder")
    typeToSend = "inorderTree";
  else if (treeTraversal === "preorder")
    typeToSend = "preorderTree";
  else if (treeTraversal === "postorder")
    typeToSend = "postorderTree";
}


    try {
      const res = await axios.post("http://localhost:5000/run", {
        type: typeToSend,
        input: input
      });

      if (res.data.states) {
        setStates(res.data.states);
        setStep(0);
        setIsPlaying(false);
      }

    } catch (error) {
      console.error("Error running algorithm:", error);
      setStates([]);
    }
  };

  useEffect(() => {

    if (isPlaying) {

      intervalRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= states.length - 1) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);

    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);

  }, [isPlaying, speed, states]);
  const runCustomGraph = async (graph, start) => {

  const res = await axios.post("http://localhost:5000/run", {
    type: algorithm,
    input: { graph, start }
  });

  setStates(res.data.states);
  setStep(0);
  setIsPlaying(false);
};


//return funtion
// return function
return (
  <div style={{ padding: "30px"}}>

    <h2>VisualAlgo Pro</h2>

    {/* Main Algorithm Dropdown */}
    <select
      value={algorithm}
      onChange={(e) => setAlgorithm(e.target.value)}
      style={{ padding: "8px", marginRight: "10px" }}
    >
      <option value="bubbleSort">Bubble Sort</option>
      <option value="selectionSort">Selection Sort</option>
      <option value="insertionSort">Insertion Sort</option>
      <option value="mergeSort">Merge Sort</option>
      <option value="quickSort">Quick Sort</option>
      <option value="stack">Stack</option>
      <option value="queue">Queue</option>
      <option value="array">Array Traverse</option>
      <option value="dp">Dynamic Programming</option>
      <option value="bfs">Graph - BFS</option>
      <option value="dfs">Graph - DFS</option>
      <option value="dijkstra">Graph - Dijkstra</option>
      <option value="linkedlist">Linked List</option>
      <option value="tree">Binary Search Tree</option>
    </select>

    {/* DP Dropdown */}
    {algorithm === "dp" && (
      <div style={{ marginTop: "15px" }}>
        <select
          value={dpAlgorithm}
          onChange={(e) => setDpAlgorithm(e.target.value)}
        >
          <option value="fibonacci">Fibonacci</option>
          <option value="knapsack">0/1 Knapsack</option>
          <option value="lcs">Longest Common Subsequence</option>
        </select>
      </div>
    )}

    {/* Tree Traversal Dropdown */}
    {algorithm === "tree" && (
      <div style={{ marginTop: "15px" }}>
        <select
          value={treeTraversal}
          onChange={(e) => setTreeTraversal(e.target.value)}
        >
          <option value="inorder">Inorder</option>
          <option value="preorder">Preorder</option>
          <option value="postorder">Postorder</option>
        </select>
      </div>
    )}

    <br /><br />

    <button onClick={runAlgorithm}>Run</button>
    <button onClick={() => setStep(prev => Math.max(prev - 1, 0))}>Prev</button>
    <button onClick={() => setStep(prev => Math.min(prev + 1, states.length - 1))}>Next</button>
    <button onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? "Pause" : "Play"}
    </button>

    <br /><br />

    <label>Speed: </label>
    <input
      type="range"
      min="100"
      max="1000"
      step="100"
      value={speed}
      onChange={(e) => setSpeed(Number(e.target.value))}
    />
    <span> {speed} ms</span>

    <hr />

    {/* MAIN TWO PANEL LAYOUT */}
<div
  style={{
    display: "flex",
    width: "100%",
    height: "600px",
    marginTop: "30px",
  }}
>

    {/* LEFT SIDE – 50% */}
  <div
    style={{
      width: "50%",
      paddingRight: "20px",
      borderRight: "1px solid #333",
    }}
  >
        {Array.isArray(states) && states.length > 0 && (

          <>
            {algorithm.includes("Sort") && (
              <SortingVisualizer state={states[step]} />
            )}

            {algorithm === "stack" && <StackVisualizer />}
            {algorithm === "queue" && <QueueVisualizer />}
            {algorithm === "array" && <ArrayVisualizer />}

            {algorithm === "dijkstra" && (
              <DijkstraVisualizer state={states[step]} />
            )}

            {algorithm === "linkedlist" && <LinkedListVisualizer />}

            {algorithm === "dp" && dpAlgorithm === "fibonacci" && (
              <DPVisualizer state={states[step]} />
            )}

            {algorithm === "dp" && dpAlgorithm === "knapsack" && (
              <KnapsackVisualizer state={states[step]} />
            )}

            {algorithm === "dp" && dpAlgorithm === "lcs" && (
              <LCSVisualizer state={states[step]} />
            )}

            {algorithm === "tree" && (
              <TreeVisualizer
                state={states[step]}
                values={[50, 30, 70, 20, 40, 60, 80]}
              />
            )}

            {(algorithm === "bfs" || algorithm === "dfs") && (
              <GraphVisualizer state={states[step]} />
            )}
          </>
        )}

      </div>

     {/* RIGHT SIDE – 50% */}
  <div
    style={{
      width: "50%",
      paddingLeft: "20px",
    }}
  >
    <CodeViewer
      algorithm={
        algorithm === "tree"
          ? treeTraversal + "Tree"
          : algorithm
      }
    />
  </div>

    </div>

  </div>
  );
}

export default App;

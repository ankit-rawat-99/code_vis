import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
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
import ChatBot from "./components/ChatBot";
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
const [theme, setTheme] = useState("dark");
const [explanation, setExplanation] = useState("");
const [isExplaining, setIsExplaining] = useState(false);
const [view, setView] = useState("main");
const [explanationChatMessages, setExplanationChatMessages] = useState([]);
const [explanationChatInput, setExplanationChatInput] = useState("");
const [isChatSending, setIsChatSending] = useState(false);

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

const getExplainPrompt = () => {
  if (algorithm === "dp") {
    const dpName = dpAlgorithm === "fibonacci" ? "Fibonacci" : dpAlgorithm === "knapsack" ? "0/1 Knapsack" : "Longest Common Subsequence";
    return `Explain the ${dpName} dynamic programming algorithm in simple terms and give a short example.`;
  }

  if (algorithm === "tree") {
    const traversal = treeTraversal === "inorder" ? "in-order" : treeTraversal === "preorder" ? "pre-order" : "post-order";
    return `Explain the binary search tree ${traversal} traversal algorithm in simple terms.`;
  }

  if (algorithm === "bfs" || algorithm === "dfs") {
    return `Explain the ${algorithm.toUpperCase()} graph traversal algorithm in simple terms.`;
  }

  const names = {
    bubbleSort: "Bubble Sort",
    selectionSort: "Selection Sort",
    insertionSort: "Insertion Sort",
    mergeSort: "Merge Sort",
    quickSort: "Quick Sort",
    stack: "Stack operations",
    queue: "Queue operations",
    array: "Array traversal",
    dijkstra: "Dijkstra's shortest path"
  };

  return `Explain the ${names[algorithm] || algorithm} algorithm in simple terms.`;
};

const openExplanationPage = async () => {
  if (view === "explain") {
    return;
  }

  if (!explanation && !isExplaining) {
    await explainAlgorithm();
    return;
  }

  setView("explain");
};

const explainAlgorithm = async () => {
  setView("explain");
  setIsExplaining(true);
  setExplanation("");
  setExplanationChatMessages([]);

  try {
    const prompt = getExplainPrompt();
    const res = await axios.post("http://localhost:5000/chat", {
      message: prompt
    });

    setExplanation(res.data.reply || "No explanation was returned.");
  } catch (err) {
    console.error(err);
    setExplanation("Failed to get an explanation from Gemini.");
  } finally {
    setIsExplaining(false);
  }
};

const askAlgoQuestion = async () => {
  const question = explanationChatInput.trim();
  if (!question) return;

  const userMsg = { sender: "user", text: question };
  setExplanationChatMessages(prev => [...prev, userMsg]);
  setIsChatSending(true);

  try {
    const message = `I have this explanation:\n${explanation || ""}\nPlease answer the follow-up question about the algorithm: ${question}`;
    const res = await axios.post("http://localhost:5000/chat", {
      message
    });

    const botMsg = { sender: "bot", text: res.data.reply || "No answer returned." };
    setExplanationChatMessages(prev => [...prev, botMsg]);
  } catch (err) {
    console.error(err);
    setExplanationChatMessages(prev => [...prev, { sender: "bot", text: "Failed to answer the question." }]);
  } finally {
    setIsChatSending(false);
    setExplanationChatInput("");
  }
};

const isDark = theme === "dark";

const colors = {
  bg: isDark ? "#0f172a" : "#f1f5f9",
  text: isDark ? "#e2e8f0" : "#0f172a",
  panel: isDark ? "#111827" : "#ffffff",
  border: isDark ? "#334155" : "#cbd5f5",
  button: isDark ? "#1e293b" : "#e2e8f0"
};

const btnStyle = {
  background: colors.button,
  color: colors.text,
  border: `1px solid ${colors.border}`,
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};

const selectStyle = {
  padding: "10px",
  borderRadius: "8px",
  background: colors.panel,
  color: colors.text,
  border: `1px solid ${colors.border}`
};
const panelStyle = {
  background: colors.panel,
  color: colors.text,
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
  overflow: "auto"
};

//return funtion
// return function
return (
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      background: colors.bg,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "30px 0",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        padding: "30px",
        margin: "0 20px",
        color: colors.text,
      }}
    >
      {/* TITLE */}
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
        VisualAlgo Pro
      </h2>

    {/* CONTROLS BAR */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        marginBottom: "20px"
      }}
    >

      {/* MAIN DROPDOWN */}
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          background: "#1e293b",
          color: "white",
          border: "1px solid #334155"
        }}
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

      {/* BUTTONS */}
      <button
  style={btnStyle}
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
>
  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
</button>
      <button style={btnStyle} onClick={runAlgorithm}>Run</button>
      <button style={btnStyle} onClick={explainAlgorithm}>Explain Algo</button>
      <button
        style={btnStyle}
        onClick={openExplanationPage}
        disabled={isExplaining}
      >
        Forward
      </button>
      <button style={btnStyle} onClick={() => setStep(prev => Math.max(prev - 1, 0))}>Prev</button>
      <button style={btnStyle} onClick={() => setStep(prev => Math.min(prev + 1, states.length - 1))}>Next</button>
      <button style={btnStyle} onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      {/* SPEED */}
      <span>Speed</span>
      <input
        type="range"
        min="100"
        max="1000"
        step="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
    </div>

    {/* DP DROPDOWN */}
    {algorithm === "dp" && (
      <div style={{ marginBottom: "15px" }}>
        <select
          value={dpAlgorithm}
          onChange={(e) => setDpAlgorithm(e.target.value)}
          style={selectStyle}
        >
          <option value="fibonacci">Fibonacci</option>
          <option value="knapsack">0/1 Knapsack</option>
          <option value="lcs">Longest Common Subsequence</option>
        </select>
      </div>
    )}

    {/* TREE DROPDOWN */}
    {algorithm === "tree" && (
      <div style={{ marginBottom: "15px" }}>
        <select
          value={treeTraversal}
          onChange={(e) => setTreeTraversal(e.target.value)}
          style={selectStyle}
        >
          <option value="inorder">Inorder</option>
          <option value="preorder">Preorder</option>
          <option value="postorder">Postorder</option>
        </select>
      </div>
    )}

    {view === "main" ? (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          minHeight: "70vh"
        }}
      >

        {/* LEFT PANEL */}
        <div style={panelStyle}>
          {Array.isArray(states) && states.length > 0 && (
            <>
              {algorithm.includes("Sort") && (
                <SortingVisualizer state={states[step]} />
              )}

              {algorithm === "stack" && <StackVisualizer />}
              {algorithm === "queue" && <QueueVisualizer />}
              {algorithm === "array" && <ArrayVisualizer />}
              {algorithm === "linkedlist" && <LinkedListVisualizer />}

              {algorithm === "dijkstra" && (
                <DijkstraVisualizer state={states[step]} />
              )}

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
                <TreeVisualizer state={states[step]} />
              )}

              {(algorithm === "bfs" || algorithm === "dfs") && (
                <GraphVisualizer state={states[step]} />
              )}
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={panelStyle}>
          <CodeViewer
            algorithm={
              algorithm === "tree"
                ? treeTraversal + "Tree"
                : algorithm === "dp"
                ? dpAlgorithm === "fibonacci"
                  ? "fibonacciDP"
                  : dpAlgorithm === "knapsack"
                  ? "knapsackDP"
                  : "lcsDP"
                : algorithm
            }
          />
        </div>
      </div>
    ) : (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <button
          style={{
            ...btnStyle,
            width: "fit-content",
            marginBottom: "0"
          }}
          onClick={() => setView("main")}
        >
          ← Back to Visualizer
        </button>

        <div style={{ ...panelStyle, width: "100%" }}>
          <h3 style={{ margin: "0 0 12px 0" }}>Algorithm Explanation</h3>
          <div style={{ marginBottom: "12px", color: colors.text, opacity: 0.8 }}>
            {`Explanation for ${algorithm === "tree" ? `${treeTraversal} traversal` : algorithm === "dp" ? dpAlgorithm : algorithm}`}
          </div>

          <div style={{ minHeight: "260px", background: isDark ? "#111827" : "#f8fafc", borderRadius: "14px", padding: "20px", border: `1px solid ${colors.border}` }}>
            {isExplaining ? (
              <div style={{ display: "grid", gap: "14px" }}>
                {[1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    style={{
                      height: "18px",
                      borderRadius: "999px",
                      background: isDark ? "rgba(148,163,184,0.15)" : "rgba(148,163,184,0.3)",
                      width: line === 1 ? "80%" : line === 2 ? "90%" : line === 3 ? "70%" : "60%"
                    }}
                  />
                ))}
              </div>
            ) : (
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: colors.text }}>
                {explanation || "No explanation available. Click Explain Algo again from the main page."}
              </div>
            )}
          </div>

          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>Cross-question Gemini</div>
              <div style={{ color: colors.text, opacity: 0.75, fontSize: "13px" }}>Ask a follow-up about the current algorithm</div>
            </div>

            <div style={{ maxHeight: "220px", overflowY: "auto", padding: "16px", background: isDark ? "#0f172a" : "#eef2ff", borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              {explanationChatMessages.length === 0 ? (
                <div style={{ color: colors.text, opacity: 0.7 }}>Type a follow-up question below to ask Gemini about this algorithm.</div>
              ) : (
                explanationChatMessages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "12px",
                      textAlign: msg.sender === "user" ? "right" : "left"
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: "14px",
                      maxWidth: "85%",
                      background: msg.sender === "user" ? (isDark ? "#1d4ed8" : "#bfdbfe") : (isDark ? "#374151" : "#e2e8f0"),
                      color: msg.sender === "user" ? "white" : colors.text,
                      lineHeight: 1.6
                    }}>
                      {msg.text}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <input
                value={explanationChatInput}
                onChange={(e) => setExplanationChatInput(e.target.value)}
                placeholder="Ask a follow-up question..."
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: `1px solid ${colors.border}`,
                  background: colors.panel,
                  color: colors.text,
                  outline: "none"
                }}
              />
              <button
                onClick={askAlgoQuestion}
                disabled={isChatSending || !explanationChatInput.trim()}
                style={{
                  ...btnStyle,
                  minWidth: "100px",
                  opacity: isChatSending ? 0.65 : 1
                }}
              >
                {isChatSending ? "Sending..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <ChatBot />
    </div>
  </div>
  
  );
}

export default App;

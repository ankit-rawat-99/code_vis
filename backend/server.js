const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const stack = require("./engine/stack");
const queue = require("./engine/queue");
const array = require("./engine/array");
const searching = require("./engine/searching");
const sorting = require("./engine/sorting");
const dp = require("./engine/dp");
const graph = require("./engine/graph");
const tree = require("./engine/tree");

const apiKey =
let genAI = null;
let model = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
} else {
  console.warn("Warning: No Gemini API key configured. Set GEMINI_API_KEY or GOOGLE_API_KEY.");
}

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

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Gemini API key is not configured" });
  }

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful assistant chatbot." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const reply = result.response ? result.response.text() : "Sorry, I could not get a reply.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini chat error:", err);
    res.status(500).json({ error: "Chatbot service failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

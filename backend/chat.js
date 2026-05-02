
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

// Initialize Gemini model with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCitg3UO6Wno6H3bNNCztZfJZ53pggrCns");
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

async function startChat() {
  const rl = readline.createInterface({ input, output });

  console.log("🤖 Gemini Chatbot\nType 'exit' to quit.\n");

  // ✅ Fix: Properly formatted chat history
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a helpful assistant chatbot." }],
      },
    ],
  });

  while (true) {
    const userInput = await rl.question("You: ");
    if (userInput.toLowerCase() === "exit") {
      break;
    }

    // Send user message
    const result = await chat.sendMessage(userInput);
    const response = result.response.text();
    console.log(`Gemini: ${response}\n`);
  }

  rl.close();
}

startChat();
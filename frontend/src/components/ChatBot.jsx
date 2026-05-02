import { useState } from "react";
import axios from "axios";

function ChatBot() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input
      });

      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "20px",
          cursor: "pointer"
        }}
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#111827",
            color: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >

          {/* HEADER */}
          <div style={{ padding: "10px", background: "#1f2937" }}>
            AI Assistant
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px"
                }}
              >
                <span
                  style={{
                    background: msg.sender === "user" ? "#3b82f6" : "#374151",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    display: "inline-block"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div style={{ display: "flex" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none"
              }}
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px",
                background: "#3b82f6",
                border: "none",
                color: "white"
              }}
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;
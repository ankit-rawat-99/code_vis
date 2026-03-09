import { useState } from "react";
import codeSnippets from "../data/codeSnippets";
import "./codeViewer.css";

function CodeViewer({ algorithm }) {

  const [language, setLanguage] = useState("cpp");

  const code =
    codeSnippets[algorithm]?.[language] ||
    "// Code not available for this algorithm";

  return (
   <div
  style={{
    width: "100%",
    height: "100%",
    background: "#1e1e1e",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    overflowY: "auto",
  }}
>

      <div className="code-header">
        <h3>Algorithm Code</h3>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      <pre className="code-block">
        <code>{code}</code>
      </pre>

    </div>
  );
}

export default CodeViewer;
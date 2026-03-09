import { useState } from "react";
import "./stack.css";

function StackVisualizer() {

  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handlePush = () => {
    if (inputValue === "") return;

    setStack([...stack, Number(inputValue)]);
    setInputValue("");
  };

  const handlePop = () => {
    if (stack.length === 0) return;

    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
  };

  return (
    <div className="stack-container">

      <h3>Stack Visualizer</h3>

      {/* Controls */}
      <div className="stack-controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
      </div>

      {/* Stack Box */}
      <div className="stack-box">
        {[...stack].reverse().map((value, index) => {
          const isTop = index === 0;
          return (
            <div
              key={index}
              className={`stack-item ${isTop ? "top" : ""}`}
            >
              {value}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default StackVisualizer;

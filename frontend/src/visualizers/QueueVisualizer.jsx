import { useState } from "react";
import "./queue.css";

function QueueVisualizer() {

  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleEnqueue = () => {
    if (inputValue === "") return;

    setQueue([...queue, Number(inputValue)]);
    setInputValue("");
  };

  const handleDequeue = () => {
    if (queue.length === 0) return;

    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  };

  return (
    <div className="queue-container">

      <h3>Queue Visualizer</h3>

      {/* Controls */}
      <div className="queue-controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={handleEnqueue}>Enqueue</button>
        <button onClick={handleDequeue}>Dequeue</button>
      </div>

      {/* Queue Display */}
      <div className="queue-box">
        {queue.map((value, index) => {

          const isFront = index === 0;
          const isRear = index === queue.length - 1;

          return (
            <div key={index} className="queue-item">
              {value}
              {isFront && <div className="front-label">Front</div>}
              {isRear && <div className="rear-label">Rear</div>}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default QueueVisualizer;

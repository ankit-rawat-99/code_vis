import { useState } from "react";
import "./linkedlist.css";

function LinkedListVisualizer() {

  const [list, setList] = useState([10, 20, 30]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);

  const insertHead = () => {
    if (!value) return;
    setList([Number(value), ...list]);
    setValue("");
  };

  const insertTail = () => {
    if (!value) return;
    setList([...list, Number(value)]);
    setValue("");
  };

  const deleteValue = () => {
    if (!value) return;
    setList(list.filter(v => v !== Number(value)));
    setValue("");
  };

  const traverse = () => {
    let i = 0;

    const interval = setInterval(() => {

      if (i >= list.length) {
        clearInterval(interval);
        setHighlight(null);
        return;
      }

      setHighlight(i);
      i++;

    }, 500);
  };

  return (
    <div className="ll-container">

      <h3>Linked List Visualizer</h3>

      <div className="ll-controls">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
        />
        <button onClick={insertHead}>Insert Head</button>
        <button onClick={insertTail}>Insert Tail</button>
        <button onClick={deleteValue}>Delete</button>
        <button onClick={traverse}>Traverse</button>
      </div>

      <div className="ll-list">
        {list.map((node, index) => (
          <div key={index} className="ll-node-wrapper">

            <div
              className={`ll-node ${
                highlight === index ? "highlight" : ""
              }`}
            >
              {node}
            </div>

            {index !== list.length - 1 && (
              <div className="ll-arrow">→</div>
            )}
          </div>
        ))}

        {list.length > 0 && <div className="ll-null">NULL</div>}
      </div>

    </div>
  );
}

export default LinkedListVisualizer;
import { useState } from "react";
import "./array.css";

function ArrayVisualizer() {

  const [array, setArray] = useState([10, 20, 30, 40]);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [highlight, setHighlight] = useState(null);

  const handleInsert = () => {
    if (value === "" || index === "") return;

    const newArray = [...array];
    newArray.splice(Number(index), 0, Number(value));
    setArray(newArray);
    setValue("");
    setIndex("");
  };

  const handleDelete = () => {
    if (index === "") return;

    const newArray = [...array];
    newArray.splice(Number(index), 1);
    setArray(newArray);
    setIndex("");
  };

  const handleUpdate = () => {
    if (value === "" || index === "") return;

    const newArray = [...array];
    newArray[Number(index)] = Number(value);
    setArray(newArray);
    setValue("");
    setIndex("");
  };

  const handleTraverse = () => {
    let i = 0;

    const interval = setInterval(() => {
      if (i >= array.length) {
        clearInterval(interval);
        setHighlight(null);
        return;
      }

      setHighlight(i);
      i++;
    }, 500);
  };

  return (
    <div className="array-container">

      <h3>Array Visualizer</h3>

      {/* Controls */}
      <div className="array-controls">
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          type="number"
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />

        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleTraverse}>Traverse</button>
      </div>

      {/* Array Display */}
      <div className="array-box">
        {array.map((item, i) => (
          <div
            key={i}
            className={`array-item ${highlight === i ? "highlight" : ""}`}
          >
            <span>{item}</span>
            <div className="index-label">{i}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ArrayVisualizer;

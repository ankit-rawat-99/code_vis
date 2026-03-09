import "./dp.css";

function DPVisualizer({ state }) {

  if (!state || !state.dp) return null;

  const { dp, highlight, formula } = state;

  return (
    <div className="dp-container">

      <h3>Fibonacci DP Table</h3>

      <div className="dp-row">
        {dp.map((value, index) => (
          <div
            key={index}
            className={`dp-cell ${highlight === index ? "highlight" : ""}`}
          >
            <div className="dp-value">
              {value !== null ? value : ""}
            </div>
            <div className="dp-index">{index}</div>
          </div>
        ))}
      </div>

      {formula && (
        <p className="formula-text">
          {formula}
        </p>
      )}

    </div>
  );
}

export default DPVisualizer;

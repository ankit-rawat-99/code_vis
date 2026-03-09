import "./knapsack.css";

function KnapsackVisualizer({ state }) {

  if (!state || !state.dp) return null;

  const { dp, highlight } = state;

  return (
    <div className="knapsack-container">

      <h3>0/1 Knapsack DP Table</h3>

      <div className="knapsack-grid">
        {dp.map((row, i) => (
          <div key={i} className="knapsack-row">
            {row.map((cell, j) => {

              const isHighlighted =
                highlight &&
                highlight[0] === i &&
                highlight[1] === j;

              return (
                <div
                  key={j}
                  className={`knapsack-cell ${
                    isHighlighted ? "highlight" : ""
                  }`}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}

export default KnapsackVisualizer;

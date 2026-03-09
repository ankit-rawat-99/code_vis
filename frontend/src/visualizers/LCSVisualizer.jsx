import "./lcs.css";

function LCSVisualizer({ state }) {

  if (!state || !state.dp) return null;

  const { dp, highlight } = state;

  return (
    <div className="lcs-container">

      <h3>LCS DP Table</h3>

      <div className="lcs-grid">
        {dp.map((row, i) => (
          <div key={i} className="lcs-row">
            {row.map((cell, j) => {

              const isHighlighted =
                highlight &&
                highlight[0] === i &&
                highlight[1] === j;

              return (
                <div
                  key={j}
                  className={`lcs-cell ${
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

export default LCSVisualizer;

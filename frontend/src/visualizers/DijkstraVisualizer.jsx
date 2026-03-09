import "./dijkstra.css";

function DijkstraVisualizer({ state }) {

  if (!state) return null;

  const { distances, current } = state;

  return (
    <div className="dijkstra-container">

      <h3>Dijkstra Shortest Path</h3>

      <table className="distance-table">
        <thead>
          <tr>
            <th>Node</th>
            <th>Distance</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(distances).map(node => (

            <tr
              key={node}
              className={Number(node) === Number(current) ? "active-row" : ""}
            >
              <td>{node}</td>
              <td>
                {distances[node] === Infinity ? "∞" : distances[node]}
              </td>
            </tr>

          ))}
        </tbody>
      </table>

    </div>
  );
}

export default DijkstraVisualizer;
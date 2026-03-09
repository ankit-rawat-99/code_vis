import { useState } from "react";
import "./graph.css";

function GraphVisualizer({ state, onRunCustom }) {

  const [graphInput, setGraphInput] = useState(
`0:1,2
1:3
2:3,4
3:
4:`);

  const [startNode, setStartNode] = useState(0);

  if (!state) return (
    <div className="graph-container">
      <h3>Graph Input</h3>

      <textarea
        rows="6"
        value={graphInput}
        onChange={(e) => setGraphInput(e.target.value)}
      />

      <br />

      <input
        type="number"
        value={startNode}
        onChange={(e) => setStartNode(Number(e.target.value))}
      />

      <button onClick={() => onRunCustom(graphInput, startNode)}>
        Run Traversal
      </button>
    </div>
  );

  const { visited, current, graph } = state;
  const nodes = Object.keys(graph);

  const positions = {};
  const radius = 120;
  const centerX = 200;
  const centerY = 150;

  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length;
    positions[node] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  return (
    <div className="graph-container">

      <svg width="400" height="300">

        {/* Edges */}
        {nodes.map(node =>
          (graph[node] || []).map(neighbor => (
            <line
              key={`${node}-${neighbor}`}
              x1={positions[node].x}
              y1={positions[node].y}
              x2={positions[neighbor].x}
              y2={positions[neighbor].y}
              stroke="#999"
            />
          ))
        )}

        {/* Nodes */}
        {nodes.map(node => {

          let fill = "#4da6ff";

          if (visited?.includes(Number(node)))
            fill = "green";

          if (current === Number(node))
            fill = "red";

          return (
            <g key={node}>
              <circle
                cx={positions[node].x}
                cy={positions[node].y}
                r="20"
                fill={fill}
              />
              <text
                x={positions[node].x}
                y={positions[node].y}
                textAnchor="middle"
                dy=".3em"
                fill="white"
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>

    </div>
  );
}

export default GraphVisualizer;

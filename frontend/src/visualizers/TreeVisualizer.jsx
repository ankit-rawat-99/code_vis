import "./tree.css";

function TreeVisualizer({ state, values }) {

  if (!values) return null;

  const positions = {};
  const edges = [];

  function buildTree(values) {
    let root = null;

    function insert(node, value) {
      if (!node) return { value, left: null, right: null };

      if (value < node.value)
        node.left = insert(node.left, value);
      else
        node.right = insert(node.right, value);

      return node;
    }

    values.forEach(v => {
      root = insert(root, v);
    });

    return root;
  }

  const root = buildTree(values);

  const levelGap = 80;

  function assignPositions(node, x, y, offset) {
    if (!node) return;

    positions[node.value] = { x, y };

    if (node.left) {
      edges.push([node.value, node.left.value]);
      assignPositions(node.left, x - offset, y + levelGap, offset / 2);
    }

    if (node.right) {
      edges.push([node.value, node.right.value]);
      assignPositions(node.right, x + offset, y + levelGap, offset / 2);
    }
  }

  assignPositions(root, 400, 60, 200);

  return (
    <div className="tree-container">
      <h3>Binary Search Tree</h3>

      <svg width="800" height="500">

        {/* Draw edges */}
        {edges.map(([parent, child], index) => {
          const p = positions[parent];
          const c = positions[child];

          return (
            <line
              key={index}
              x1={p.x}
              y1={p.y}
              x2={c.x}
              y2={c.y}
              stroke="#999"
            />
          );
        })}

        {/* Draw nodes */}
        {Object.keys(positions).map(value => {

          const { x, y } = positions[value];
          const isCurrent = state?.current === Number(value);

          return (
            <g key={value}>
              <circle
                cx={x}
                cy={y}
                r="25"
                fill={isCurrent ? "orange" : "#4da6ff"}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dy=".3em"
                fill="white"
              >
                {value}
              </text>
            </g>
          );
        })}

      </svg>
    </div>
  );
}

export default TreeVisualizer;
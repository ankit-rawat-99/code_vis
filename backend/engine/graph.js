// Sample static graph (adjacency list)
const graph = {
  0: [1, 2],
  1: [3],
  2: [3, 4],
  3: [],
  4: []
};

// ================= BFS =================
function bfs(input) {

  const { graph, start } = input;

  let visited = new Set();
  let queue = [start];
  let states = [];

  visited.add(start);

  while (queue.length > 0) {

    let node = queue.shift();

    states.push({
      visited: Array.from(visited),
      current: node,
      queue: [...queue],
      graph
    });

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        states.push({
          visited: Array.from(visited),
          current: node,
          queue: [...queue],
          graph
        });
      }
    }
  }

  return states;
}

// ================= DFS =================
function dfs(input) {

  const { graph, start } = input;

  let visited = new Set();
  let stack = [start];
  let states = [];

  while (stack.length > 0) {

    let node = stack.pop();

    if (!visited.has(node)) {

      visited.add(node);

      states.push({
        visited: Array.from(visited),
        current: node,
        stack: [...stack],
        graph
      });

      for (let neighbor of (graph[node] || []).reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  return states;
}

module.exports = { bfs, dfs };
function dijkstra(input) {

  const { graph, start } = input;

  let distances = {};
  let visited = new Set();
  let states = [];

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
  });

  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {

    let current = Object.keys(distances)
      .filter(node => !visited.has(node))
      .reduce((minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode
      );

    visited.add(current);

    states.push({
      distances: { ...distances },
      current
    });

    for (let edge of graph[current]) {

      if (!visited.has(edge.node)) {

        let newDist = distances[current] + edge.weight;

        if (newDist < distances[edge.node]) {

          distances[edge.node] = newDist;

          states.push({
            distances: { ...distances },
            current
          });
        }
      }
    }
  }

  return states;
}
module.exports = { bfs, dfs, dijkstra };
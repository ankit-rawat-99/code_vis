class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertNode(root, value) {
  if (!root) return new TreeNode(value);

  if (value < root.value)
    root.left = insertNode(root.left, value);
  else
    root.right = insertNode(root.right, value);

  return root;
}

function buildBST(values) {
  let root = null;
  values.forEach(val => {
    root = insertNode(root, val);
  });
  return root;
}

// Traversals
function inorderTraversal(root, states) {
  if (!root) return;
  inorderTraversal(root.left, states);
  states.push({ current: root.value });
  inorderTraversal(root.right, states);
}

function preorderTraversal(root, states) {
  if (!root) return;
  states.push({ current: root.value });
  preorderTraversal(root.left, states);
  preorderTraversal(root.right, states);
}

function postorderTraversal(root, states) {
  if (!root) return;
  postorderTraversal(root.left, states);
  postorderTraversal(root.right, states);
  states.push({ current: root.value });
}

function inorder(input) {
  const root = buildBST(input.values);
  let states = [];
  inorderTraversal(root, states);
  return states;
}

function preorder(input) {
  const root = buildBST(input.values);
  let states = [];
  preorderTraversal(root, states);
  return states;
}

function postorder(input) {
  const root = buildBST(input.values);
  let states = [];
  postorderTraversal(root, states);
  return states;
}

module.exports = {
  inorder,
  preorder,
  postorder,
  buildBST
};
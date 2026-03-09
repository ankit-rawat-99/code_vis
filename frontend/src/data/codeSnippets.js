const codeSnippets = {

  bubbleSort: {
    cpp: `
void bubbleSort(vector<int>& arr) {
    for(int i = 0; i < arr.size(); i++) {
        for(int j = 0; j < arr.size() - i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
`,
    java: `
public void bubbleSort(int[] arr) {
    for(int i = 0; i < arr.length; i++) {
        for(int j = 0; j < arr.length - i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
`,
    python: `
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
`
  },

  inorderTree: {
    cpp: `
void inorder(TreeNode* root) {
    if(root == NULL) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}
`,
    java: `
public void inorder(TreeNode root) {
    if(root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
}
`,
    python: `
def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)
`
  }

};

export default codeSnippets;
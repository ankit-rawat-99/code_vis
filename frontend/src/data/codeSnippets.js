const codeSnippets = {

  // ================= SORTING =================

  selectionSort: {
    cpp: `void selectionSort(vector<int>& arr){
  for(int i=0;i<arr.size();i++){
    int min=i;
    for(int j=i+1;j<arr.size();j++){
      if(arr[j]<arr[min]) min=j;
    }
    swap(arr[i],arr[min]);
  }
}`,
    java: `void selectionSort(int[] arr){
  for(int i=0;i<arr.length;i++){
    int min=i;
    for(int j=i+1;j<arr.length;j++){
      if(arr[j]<arr[min]) min=j;
    }
    int temp=arr[i];
    arr[i]=arr[min];
    arr[min]=temp;
  }
}`,
    python: `def selection_sort(arr):
  for i in range(len(arr)):
    min_i = i
    for j in range(i+1, len(arr)):
      if arr[j] < arr[min_i]:
        min_i = j
    arr[i], arr[min_i] = arr[min_i], arr[i]`
  },

  insertionSort: {
    cpp: `void insertionSort(vector<int>& arr){
  for(int i=1;i<arr.size();i++){
    int key=arr[i], j=i-1;
    while(j>=0 && arr[j]>key){
      arr[j+1]=arr[j];
      j--;
    }
    arr[j+1]=key;
  }
}`,
    java: `void insertionSort(int[] arr){
  for(int i=1;i<arr.length;i++){
    int key=arr[i], j=i-1;
    while(j>=0 && arr[j]>key){
      arr[j+1]=arr[j];
      j--;
    }
    arr[j+1]=key;
  }
}`,
    python: `def insertion_sort(arr):
  for i in range(1,len(arr)):
    key = arr[i]
    j = i-1
    while j>=0 and arr[j]>key:
      arr[j+1] = arr[j]
      j -= 1
    arr[j+1] = key`
  },

  mergeSort: {
    cpp: `void merge(vector<int>& arr,int l,int m,int r){
  vector<int> temp;
  int i=l,j=m+1;
  while(i<=m && j<=r){
    if(arr[i]<arr[j]) temp.push_back(arr[i++]);
    else temp.push_back(arr[j++]);
  }
  while(i<=m) temp.push_back(arr[i++]);
  while(j<=r) temp.push_back(arr[j++]);
  for(int k=0;k<temp.size();k++) arr[l+k]=temp[k];
}

void mergeSort(vector<int>& arr,int l,int r){
  if(l>=r) return;
  int m=(l+r)/2;
  mergeSort(arr,l,m);
  mergeSort(arr,m+1,r);
  merge(arr,l,m,r);
}`,
    java: `void mergeSort(int[] arr,int l,int r){
  if(l>=r) return;
  int m=(l+r)/2;
  mergeSort(arr,l,m);
  mergeSort(arr,m+1,r);
  merge(arr,l,m,r);
}`,
    python: `def merge_sort(arr):
  if len(arr)>1:
    mid=len(arr)//2
    L=arr[:mid]
    R=arr[mid:]
    merge_sort(L)
    merge_sort(R)`
  },

  quickSort: {
    cpp: `int partition(vector<int>& arr,int low,int high){
  int pivot=arr[high], i=low-1;
  for(int j=low;j<high;j++){
    if(arr[j]<pivot){
      i++; swap(arr[i],arr[j]);
    }
  }
  swap(arr[i+1],arr[high]);
  return i+1;
}

void quickSort(vector<int>& arr,int low,int high){
  if(low<high){
    int pi=partition(arr,low,high);
    quickSort(arr,low,pi-1);
    quickSort(arr,pi+1,high);
  }
}`,
    java: `void quickSort(int[] arr,int low,int high){
  if(low<high){
    int pi=partition(arr,low,high);
    quickSort(arr,low,pi-1);
    quickSort(arr,pi+1,high);
  }
}`,
    python: `def quick_sort(arr):
  if len(arr)<=1: return arr
  pivot=arr[0]
  left=[x for x in arr[1:] if x<=pivot]
  right=[x for x in arr[1:] if x>pivot]
  return quick_sort(left)+[pivot]+quick_sort(right)`
  },

  // ================= STACK =================

  stack: {
    cpp: `stack<int> st;
st.push(10);
st.pop();`,
    java: `Stack<Integer> st=new Stack<>();
st.push(10);
st.pop();`,
    python: `stack=[]
stack.append(10)
stack.pop()`
  },

  // ================= QUEUE =================

  queue: {
    cpp: `queue<int> q;
q.push(10);
q.pop();`,
    java: `Queue<Integer> q=new LinkedList<>();
q.add(10);
q.remove();`,
    python: `from collections import deque
q=deque()
q.append(10)
q.popleft()`
  },

  // ================= ARRAY =================

  array: {
    cpp: `for(int i=0;i<arr.size();i++)
  cout<<arr[i];`,
    java: `for(int i=0;i<arr.length;i++)
  System.out.println(arr[i]);`,
    python: `for x in arr:
  print(x)`
  },

  // ================= DP =================

fibonacciDP: {
  cpp: `int fib(int n){
  vector<int> dp(n+1);
  dp[0]=0;
  dp[1]=1;

  for(int i=2;i<=n;i++){
    dp[i]=dp[i-1]+dp[i-2];
  }

  return dp[n];
}`,
  
  java: `int fib(int n){
  int[] dp = new int[n+1];
  dp[0]=0;
  dp[1]=1;

  for(int i=2;i<=n;i++){
    dp[i]=dp[i-1]+dp[i-2];
  }

  return dp[n];
}`,

  python: `def fib(n):
  dp = [0]*(n+1)
  dp[0], dp[1] = 0, 1

  for i in range(2, n+1):
    dp[i] = dp[i-1] + dp[i-2]

  return dp[n]`
},
  knapsackDP: {
  cpp: `int knapsack(int W, vector<int>& wt, vector<int>& val, int n){
  vector<vector<int>> dp(n+1, vector<int>(W+1, 0));

  for(int i=1;i<=n;i++){
    for(int w=1;w<=W;w++){
      if(wt[i-1] <= w){
        dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }

  return dp[n][W];
}`,
  
  java: `int knapsack(int W, int[] wt, int[] val, int n){
  int[][] dp = new int[n+1][W+1];

  for(int i=1;i<=n;i++){
    for(int w=1;w<=W;w++){
      if(wt[i-1] <= w){
        dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }

  return dp[n][W];
}`,

  python: `def knapsack(W, wt, val, n):
  dp = [[0]*(W+1) for _ in range(n+1)]

  for i in range(1, n+1):
    for w in range(1, W+1):
      if wt[i-1] <= w:
        dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
      else:
        dp[i][w] = dp[i-1][w]

  return dp[n][W]`
},
lcsDP: {
  cpp: `int lcs(string a, string b){
  int n=a.size(), m=b.size();
  vector<vector<int>> dp(n+1, vector<int>(m+1, 0));

  for(int i=1;i<=n;i++){
    for(int j=1;j<=m;j++){
      if(a[i-1]==b[j-1]){
        dp[i][j] = 1 + dp[i-1][j-1];
      } else {
        dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }

  return dp[n][m];
}`,
  
  java: `int lcs(String a, String b){
  int n=a.length(), m=b.length();
  int[][] dp = new int[n+1][m+1];

  for(int i=1;i<=n;i++){
    for(int j=1;j<=m;j++){
      if(a.charAt(i-1)==b.charAt(j-1)){
        dp[i][j] = 1 + dp[i-1][j-1];
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }

  return dp[n][m];
}`,

  python: `def lcs(a, b):
  n, m = len(a), len(b)
  dp = [[0]*(m+1) for _ in range(n+1)]

  for i in range(1, n+1):
    for j in range(1, m+1):
      if a[i-1] == b[j-1]:
        dp[i][j] = 1 + dp[i-1][j-1]
      else:
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])

  return dp[n][m]`
},
  // ================= GRAPH =================

  bfs: {
    cpp: `queue<int> q;
q.push(start);`,
    java: `Queue<Integer> q=new LinkedList<>();`,
    python: `from collections import deque`
  },

  dfs: {
    cpp: `void dfs(int node){
  visited[node]=true;
}`,
    java: `void dfs(int node){
}`,
    python: `def dfs(node):
  visited[node]=True`
  },

  dijkstra: {
    cpp: `priority_queue<pair<int,int>> pq;`,
    java: `PriorityQueue<int[]> pq=new PriorityQueue<>();`,
    python: `import heapq`
  },

  // ================= LINKED LIST =================

  linkedlist: {
    cpp: `struct Node{
  int data;
  Node* next;
};`,
    java: `class Node{
  int data;
  Node next;
}`,
    python: `class Node:
  def __init__(self,data):
    self.data=data
    self.next=None`
  },
  // ================= bubbleSort =================
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
`},

  // ================= TREE =================

  inorderTree: {
    cpp: `void inorder(Node* root){
  if(!root) return;
  inorder(root->left);
  cout<<root->data;
  inorder(root->right);
}`,
    java: `void inorder(Node root){
  if(root==null) return;
  inorder(root.left);
  inorder(root.right);
}`,
    python: `def inorder(root):
  if not root: return
  inorder(root.left)
  inorder(root.right)`
  },

  preorderTree: {
    cpp: `void preorder(Node* root){
  if(!root) return;
  cout<<root->data;
  preorder(root->left);
  preorder(root->right);
}`,
    java: `void preorder(Node root){
}`,
    python: `def preorder(root):
  if not root: return`
  },

  postorderTree: {
    cpp: `void postorder(Node* root){
  if(!root) return;
  postorder(root->left);
  postorder(root->right);
  cout<<root->data;
}`,
    java: `void postorder(Node root){
}`,
    python: `def postorder(root):
  if not root: return`
  }

};

export default codeSnippets;
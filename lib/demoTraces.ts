import { TraceEvent } from "@/types/trace";

// Max Area of Island (Simplified 2x2 grid)
/*
Grid:
[1, 0]
[1, 1]
*/

export const DFS_TRACE: TraceEvent[] = [
  // Setup Grid
  { type: "call", fn: "maxAreaOfIsland" },
  { type: "state", key: "grid", value: [[1, 0], [1, 1]] },
  { type: "state", key: "maxArea", value: 0 },
  
  // Start Loop (0,0) - Land
  { type: "pointer", from: "current", to: "(0,0)" },
  { type: "call", fn: "dfs(0,0)" },
  
  // DFS Logic (0,0)
  { type: "state", key: "grid[0][0]", value: 0 }, // Mark visited
  { type: "state", key: "area", value: 1 }, 
  
  // Explore Neighbors
  // Up (out of bounds) -> skip
  // Down (1,0) - Land
  { type: "call", fn: "dfs(1,0)" },
  { type: "state", key: "grid[1][0]", value: 0 }, // Mark visited
  
  // Explore Neighbors of (1,0)
  // Right (1,1) - Land
  { type: "call", fn: "dfs(1,1)" },
  { type: "state", key: "grid[1][1]", value: 0 }, // Mark visited
  
  // Explore Neighbors of (1,1) -> All visited or 0
  { type: "return", fn: "dfs(1,1)" }, // Return 1
  
  // Back to (1,0), add result
  { type: "state", key: "area", value: 2 }, // 1 + 1 (from child)
  { type: "return", fn: "dfs(1,0)" }, // Return 2
  
  // Back to (0,0), add result
  { type: "state", key: "area", value: 3 }, // 1 + 2 (from child)
  
  // Try Right (0,1) - Water
  // ... skip
  
  { type: "return", fn: "dfs(0,0)" }, // Return 3
  
  // Update Max Area
  { type: "state", key: "maxArea", value: 3 }
];

// --- Stack (Push/Pop) ---
export const STACK_TRACE: TraceEvent[] = [
  { type: "call", fn: "demoStack" },
  { type: "list", nodes: [], links: [] }, // Empty
  { type: "call", fn: "push(10)" },
  { type: "list", nodes: ["10"], links: [] },
  { type: "return", fn: "push" },
  { type: "call", fn: "push(20)" },
  { type: "list", nodes: ["20", "10"], links: [["20", "10"]] }, // 20 -> 10 (Stack top is head)
  { type: "return", fn: "push" },
  { type: "call", fn: "pop()" },
  { type: "state", key: "popped", value: 20 },
  { type: "list", nodes: ["10"], links: [] },
  { type: "return", fn: "pop" },
  { type: "return", fn: "demoStack" }
];

// --- Queue (Enqueue/Dequeue) ---
export const QUEUE_TRACE: TraceEvent[] = [
  { type: "call", fn: "demoQueue" },
  { type: "list", nodes: [], links: [] },
  { type: "call", fn: "enqueue(A)" },
  { type: "list", nodes: ["A"], links: [] },
  { type: "return", fn: "enqueue" },
  { type: "call", fn: "enqueue(B)" },
  { type: "list", nodes: ["A", "B"], links: [["A", "B"]] }, // A -> B
  { type: "return", fn: "enqueue" },
  { type: "call", fn: "dequeue()" },
  { type: "state", key: "served", value: "A" },
  { type: "list", nodes: ["B"], links: [] },
  { type: "return", fn: "dequeue" },
  { type: "return", fn: "demoQueue" }
];

// --- Backtracking (Maze/Path) ---
export const BACKTRACK_TRACE: TraceEvent[] = [
  { type: "call", fn: "solveMaze(0,0)" },
  { type: "tree", nodes: [{ id: "(0,0)", children: [] }] },
  { type: "state", key: "path", value: ["(0,0)"] },
  
  // Try Down
  { type: "call", fn: "solveMaze(1,0)" },
  { type: "tree", nodes: [{ id: "(0,0)", children: ["(1,0)"] }, { id: "(1,0)", children: [] }] },
  { type: "state", key: "path", value: ["(0,0)", "(1,0)"] },
  
  // Dead End
  { type: "state", key: "status", value: "Dead End" },
  { type: "return", fn: "backtrack" },
  // Rollback state visually implied by tree structure remaining but logical path updates
  { type: "state", key: "path", value: ["(0,0)"] }, 
  
  // Try Right
  { type: "call", fn: "solveMaze(0,1)" },
  { type: "tree", nodes: [{ id: "(0,0)", children: ["(1,0)", "(0,1)"] }, { id: "(1,0)", children: [] }, { id: "(0,1)", children: [] }] },
  { type: "state", key: "path", value: ["(0,0)", "(0,1)"] },
  { type: "state", key: "status", value: "Goal Reached" },
  { type: "return", fn: "solveMaze" }
];

// --- Tree (DFS Preorder) ---
export const TREE_TRACE: TraceEvent[] = [
  { type: "call", fn: "preorder(Root)" },
  { type: "tree", nodes: [
      { id: "Root", children: ["L", "R"] },
      { id: "L", children: ["L1"] },
      { id: "L1", children: [] },
      { id: "R", children: [] }
    ] 
  },
  { type: "state", key: "visited", value: ["Root"] },
  
  { type: "call", fn: "preorder(L)" },
  { type: "state", key: "visited", value: ["Root", "L"] },
  
  { type: "call", fn: "preorder(L1)" },
  { type: "state", key: "visited", value: ["Root", "L", "L1"] },
  { type: "return", fn: "preorder" }, // Pop L1
  
  { type: "return", fn: "preorder" }, // Pop L
  
  { type: "call", fn: "preorder(R)" },
  { type: "state", key: "visited", value: ["Root", "L", "L1", "R"] },
  { type: "return", fn: "preorder" },
  
  { type: "return", fn: "preorder" }
];

// --- Graph (BFS) ---
export const GRAPH_TRACE: TraceEvent[] = [
  { type: "call", fn: "bfs(Start)" },
  { type: "graph", nodes: ["A", "B", "C", "D"], edges: [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]] },
  { type: "state", key: "queue", value: ["A"] },
  
  { type: "state", key: "current", value: "A" },
  { type: "state", key: "visited", value: ["A"] },
  { type: "state", key: "queue", value: ["B", "C"] }, // Neighbors of A
  
  { type: "state", key: "current", value: "B" }, // Dequeue A, next B
  { type: "state", key: "visited", value: ["A", "B"] },
  { type: "state", key: "queue", value: ["C", "D"] }, // Neighbors of B
  
  { type: "state", key: "current", value: "C" },
  { type: "state", key: "visited", value: ["A", "B", "C"] },
  // D already in queue
  
  { type: "state", key: "current", value: "D" },
  { type: "state", key: "visited", value: ["A", "B", "C", "D"] },
  { type: "return", fn: "bfs" }
];

// --- Trie (Static Insert) ---
export const TRIE_TRACE: TraceEvent[] = [
  { type: "call", fn: "Trie" },
  // Simple representation: flatten recursive structure for tree view
  { type: "tree", nodes: [
      { id: "root", children: ["c"] },
      { id: "c", children: ["a"] },
      { id: "a", children: ["t*", "r"] },
      { id: "t*", children: [] }, // cat
      { id: "r", children: ["*"] } // car
    ] 
  },
  { type: "state", key: "words", value: ["cat", "car"] }
];

// --- DP (Table Fill) ---
export const DP_TRACE: TraceEvent[] = [
  { type: "call", fn: "fib_tabulation(4)" },
  { type: "dpTable", rows: 1, cols: 5, values: [[0, 0, 0, 0, 0]] }, // Index 0-4
  
  { type: "state", key: "i", value: 0 },
  { type: "dpTable", rows: 1, cols: 5, values: [[0, 0, 0, 0, 0]] }, // Base case fib(0)=0
  
  { type: "state", key: "i", value: 1 },
  { type: "dpTable", rows: 1, cols: 5, values: [[0, 1, 0, 0, 0]] }, // Base case fib(1)=1
  
  { type: "state", key: "i", value: 2 },
  { type: "dpTable", rows: 1, cols: 5, values: [[0, 1, 1, 0, 0]] }, // 0+1=1
  
  { type: "state", key: "i", value: 3 },
  { type: "dpTable", rows: 1, cols: 5, values: [[0, 1, 1, 2, 0]] }, // 1+1=2
  
  { type: "state", key: "i", value: 4 },
  { type: "dpTable", rows: 1, cols: 5, values: [[0, 1, 1, 2, 3]] }, // 1+2=3
  
  { type: "return", fn: "fib" }
];

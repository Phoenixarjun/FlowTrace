export type TopicContent = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  intuition: string; // "Why it matters"
  behavior: string[]; // "How it behaves" - Bullet points
  operations: string[]; // "Core operations"
  demoKey: string; // Query param for playground
  isAdvanced?: boolean; // For DP/Trie warning
};

export const TOPICS: Record<string, TopicContent> = {
  "linked-list": {
    id: "linked-list",
    title: "Linked List",
    subtitle: "A chain of nodes connected by pointers.",
    description: "A linear data structure where elements are not stored at contiguous memory locations. The elements are linked using pointers.",
    intuition: "Imagine a treasure hunt where each clue leads you to the location of the next clue. You can't jump to the end; you must follow the path.",
    behavior: [
      "Dynamic Size: Can grow or shrink during execution.",
      "Sequential Access: Must traverse from the head to find elements.",
      "Efficient Insertion/Deletion: fast if you have the pointer to the location."
    ],
    operations: ["Traversal: O(n)", "Search: O(n)", "Insert/Delete: O(1) (at known position)"],
    demoKey: "linked-list"
  },
  "stack": {
    id: "stack",
    title: "Stack",
    subtitle: "Last-In, First-Out (LIFO).",
    description: "A collection of elements that supports two main operations: push (add) and pop (remove), both occurring at the same end.",
    intuition: "Like a stack of plates in a cafeteria. You assume the top one is the cleanest or latest, and you can only take that one off.",
    behavior: [
      "LIFO Principle: The last element added is the first one removed.",
      "Restricted Access: You can only 'peek' at the top element."
    ],
    operations: ["Push: O(1)", "Pop: O(1)", "Peek: O(1)"],
    demoKey: "stack"
  },
  "queue": {
    id: "queue",
    title: "Queue",
    subtitle: "First-In, First-Out (FIFO).",
    description: "A collection where elements are added at the back (enqueue) and removed from the front (dequeue).",
    intuition: "Like a line at a ticket counter. The first person to join the line is the first one served.",
    behavior: [
      "FIFO Principle: Preserves the order of arrival.",
      "Two Ends: Action happens at both head and tail."
    ],
    operations: ["Enqueue: O(1)", "Dequeue: O(1)", "Peek: O(1)"],
    demoKey: "queue"
  },
  "backtracking": {
    id: "backtracking",
    title: "Backtracking",
    subtitle: "Systematic exploration of all possibilities.",
    description: "An algorithmic technique for solving problems recursively by trying to build a solution incrementally, and abandoning it ('backtracking') as soon as it determines the solution cannot be completed.",
    intuition: "Like walking through a maze. If you hit a dead end, you retrace your steps to the last junction and try a different path.",
    behavior: [
      "Depth-First Logic: Explores one branch as deep as possible before trying others.",
      "State Rollback: Crucially, it undoes changes (unmarks visited) when returning from recursion."
    ],
    operations: ["Choice", "Constraint Check", "Recursive Step", "Backtrack (Undo)"],
    demoKey: "backtracking"
  },
  "trees": {
    id: "trees",
    title: "Trees",
    subtitle: "Hierarchical data organizations.",
    description: "A non-linear data structure with a root node and sub-nodes, forming a parent-child structure.",
    intuition: "Like an organizational chart or file system. Everything starts from a root (CEO/Root Folder) and branches out.",
    behavior: [
      "Hierarchy: Clear parent-child relationships.",
      "Recursive Structure: Each subtree is itself a tree.",
      "No Cycles: There is exactly one path between any two nodes."
    ],
    operations: ["DFS (Pre/In/Post-order)", "BFS (Level-order)", "Insert/Delete"],
    demoKey: "tree"
  },
  "graphs": {
    id: "graphs",
    title: "Graphs",
    subtitle: "Networks of connected entities.",
    description: "A collection of nodes (vertices) and edges that connect pairs of nodes.",
    intuition: "Like a map of cities and roads, or a social network. Relationships can be one-way or two-way, and cycles are allowed.",
    behavior: [
      "Connectivity: Tracks which nodes are reachable from others.",
      "Cycles: You can loop back to where you started.",
      "Versatility: Models almost any relationship network."
    ],
    operations: ["BFS (Shortest Path)", "DFS (Exploration)", "Cycle Detection"],
    demoKey: "graph"
  },
  "trie": {
    id: "trie",
    title: "Trie (Prefix Tree)",
    subtitle: "Efficient retrieval for strings.",
    description: "A tree-like data structure used to store a dynamic set of strings where the geometric position of a node defines its associated key.",
    intuition: "Like a dictionary autocomplete. Typing 'ap' narrows down to 'apple', 'apply', 'apt'.",
    behavior: [
      "Shared Prefixes: Common starting letters are stored once.",
      "Deterministic Path: Following 'c' -> 'a' -> 't' always leads to the same node."
    ],
    operations: ["Insert: O(L)", "Search: O(L)", "StartsWith: O(L)"],
    demoKey: "trie",
    isAdvanced: true
  },
  "dp": {
    id: "dp",
    title: "Dynamic Programming",
    subtitle: "Optimization by remembering the past.",
    description: "A method for solving complex problems by breaking them down into simpler subproblems and storing their solutions (memoization/tabulation).",
    intuition: "Like filling a crossword. You solve easy clues that help you solve harder ones intersection them. You never solve the same clue twice.",
    behavior: [
      "Overlapping Subproblems: The same small problems appear repeatedly.",
      "Optimal Substructure: The big solution is built from optimal small solutions.",
      "Table Filling: Systematically populating the grid."
    ],
    operations: ["Memoization (Top-Down)", "Tabulation (Bottom-Up)", "State Transition"],
    demoKey: "dp",
    isAdvanced: true
  }
};

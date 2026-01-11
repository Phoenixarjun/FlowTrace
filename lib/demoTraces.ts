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
  { type: "state", key: "maxArea", value: 3 },
  
  // Continue Loop... (rest visited/water)
  { type: "return", fn: "maxAreaOfIsland" }
];

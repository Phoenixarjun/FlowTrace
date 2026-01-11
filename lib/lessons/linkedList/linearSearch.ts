import { Lesson } from "@/types/lesson";
import { TraceEvent } from "@/types/trace";

const TRACE_STEP2: TraceEvent[] = [
  { type: "call", fn: "setup" },
  { type: "list", nodes: ["10", "42", "5"], links: [["10", "42"], ["42", "5"], ["5", null]] },
  { type: "return", fn: "setup" }
];

const TRACE_STEP3: TraceEvent[] = [
  { type: "call", fn: "search(42)" },
  { type: "list", nodes: ["10", "42", "5"], links: [["10", "42"], ["42", "5"], ["5", null]] },
  
  // Start at head
  { type: "state", key: "target", value: 42 },
  { type: "pointer", from: "current", to: "10" },
  
  // Check 10
  { type: "state", key: "check", value: "10 == 42?" },
  { type: "state", key: "found", value: false },
  
  // Move next
  { type: "pointer", from: "current", to: "42" },
  
  // Check 42
  { type: "state", key: "check", value: "42 == 42?" },
  { type: "state", key: "found", value: true },
  
  // Return true
  { type: "return", fn: "search" }
];

export const LINEAR_SEARCH_LESSON: Lesson = {
  id: "linear-search",
  title: "Linear Search",
  category: "linked-list",
  algorithm: "Linear Search",
  steps: [
    {
      title: "What is Linear Search?",
      explanation: "In a Linked List, we cannot access elements by index directly. To find a value, we must start at the HEAD and traverse node by node until we find the target or reach null.",
      trace: []
    },
    {
      title: "The Setup",
      explanation: "Here is a simple Linked List with three nodes: 10 -> 42 -> 5. We want to find the value 42.",
      trace: TRACE_STEP2
    },
    {
      title: "Execution",
      explanation: "Watch as the 'current' pointer moves from 10 to 42. When current.value matches 42, we return true.",
      trace: TRACE_STEP3
    }
  ]
};

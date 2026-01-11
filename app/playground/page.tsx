"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TraceEvent, ExecutionState } from "@/types/trace";
import { initialExecutionState } from "@/lib/initialState";
import { reduceEvent } from "@/lib/traceReducer";
import ExecutionPanel from "@/components/ExecutionPanel";
import TraceInput from "@/components/TraceInput";
import VisualRenderer from "@/components/visuals/VisualRenderer";
import { 
  DFS_TRACE, 
  STACK_TRACE, 
  QUEUE_TRACE, 
  BACKTRACK_TRACE, 
  TREE_TRACE, 
  GRAPH_TRACE, 
  TRIE_TRACE, 
  DP_TRACE 
} from "@/lib/demoTraces";

// Default demo trace
const DEMO_TRACE: TraceEvent[] = [
  { type: "call", fn: "main" },
  { type: "state", key: "x", value: 10 },
  { type: "call", fn: "helper" },
  { type: "pointer", from: "head", to: "node1" },
  { type: "return", fn: "helper" },
  { type: "state", key: "x", value: 20 },
  { type: "call", fn: "finish" },
];

// Demo Registry
const DEMO_TRACES: Record<string, TraceEvent[]> = {
  "dfs": DFS_TRACE,
  "stack": STACK_TRACE,
  "queue": QUEUE_TRACE,
  "backtracking": BACKTRACK_TRACE,
  "tree": TREE_TRACE,
  "graph": GRAPH_TRACE,
  "trie": TRIE_TRACE,
  "dp": DP_TRACE,
  "linked-list": DFS_TRACE // Using DFS trace as placeholder or generic recursion if specific traversal not ready
};

// ... imports
import OperationsPanel from "@/components/OperationsPanel";

// ... existing code

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const [trace, setTrace] = useState<TraceEvent[]>(DEMO_TRACE);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [executionState, setExecutionState] = useState<ExecutionState>(
    initialExecutionState
  );
  
  // Sandbox State
  // Mode: "linked-list" | "stack" | "queue" | null
  const [mode, setMode] = useState<string | null>(null);
  const [structureData, setStructureData] = useState<string[]>([]);
  
  useEffect(() => {
    const demo = searchParams.get("demo");
    const sandboxMode = searchParams.get("mode") === "sandbox";
    
    if (demo && DEMO_TRACES[demo]) {
      setTrace(DEMO_TRACES[demo]);
      setExecutionState(initialExecutionState);
      setCurrentStep(-1);
      
      if (sandboxMode) {
          // Initialize sandbox based on demo type
          if (demo === "linked-list" || demo === "stack" || demo === "queue") {
              setMode(demo);
              setStructureData([]); // Start empty
              setTrace([]); // Start with empty trace
          }
      } else {
          setMode(null);
      }
    }
  }, [searchParams]);

  const handleNext = () => {
    if (currentStep < trace.length - 1) {
      const nextStepIndex = currentStep + 1;
      const event = trace[nextStepIndex];
      const newState = reduceEvent(executionState, event);
      setExecutionState(newState);
      setCurrentStep(nextStepIndex);
    }
  };

  const handleReset = () => {
    setExecutionState(initialExecutionState);
    setCurrentStep(-1);
  };
  
  // Auto-play effect for appended traces
  useEffect(() => {
      // If we are in sandbox mode, and trace grows, we could auto-play? 
      // Or just let user step through. "Interactive" usually implies auto-play of the operation.
      // Let's implement a simple auto-play mechanism on appending?
      // For now, let's keep manual stepping for safety and instructional value.
  }, [trace.length]);

  const handleLoadTrace = (newTrace: TraceEvent[]) => {
    setTrace(newTrace);
    handleReset();
  };
  
  const handleTraceAppend = (newEvents: TraceEvent[]) => {
      // Append new events to current trace
      // If current trace is empty, just set it.
      // If we are in the middle of a trace, we should append to the END?
      // Yes, user triggers "Add(5)", it happens AFTER what's currently shown.
      
      const updatedTrace = [...trace, ...newEvents];
      setTrace(updatedTrace);
      
      // Auto-advance logic could go here:
      // We want to verify users can hit "Next" to see it.
  };

  const toggleMode = (newMode: string | null) => {
      // Reset state when switching
      setExecutionState(initialExecutionState);
      setCurrentStep(-1);
      setTrace(DEMO_TRACE);
      
      if (newMode === "sandbox") {
          // Default to linked list sandbox
          setMode("linked-list");
          setStructureData([]);
          setTrace([]);
      } else {
          setMode(null);
      }
  };

  return (
    <main className="flex-1 p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-flow-text mb-2">
                Playground {mode ? `(${mode} operations)` : ""}
            </h1>
            <p className="text-flow-text-muted">
              Runtime Injection & Visualization
            </p>
          </div>
          
          {/* Mode Switcher */}
          <div className="flex bg-flow-surface rounded-lg p-1 border border-white/10 mr-auto ml-8">
              <button 
                onClick={() => toggleMode(null)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!mode ? 'bg-flow-accent-primary text-black' : 'text-flow-text-muted hover:text-flow-text'}`}
              >
                  Trace Mode
              </button>
              <button 
                onClick={() => toggleMode("sandbox")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode ? 'bg-flow-accent-primary text-black' : 'text-flow-text-muted hover:text-flow-text'}`}
              >
                  Sandbox Mode
              </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-flow-surface border border-white/10 text-flow-text rounded hover:bg-white/5 disabled:opacity-50"
              disabled={currentStep === -1}
            >
              Reset
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep >= trace.length - 1}
              className="px-4 py-2 bg-flow-accent-primary text-black font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Step Next
            </button>
          </div>
        </div>

        {/* Operations Panel (Sandbox Mode Only) */}
        {mode && (
            <OperationsPanel 
                mode={mode} 
                onTraceGenerated={handleTraceAppend}
                currentStructure={structureData}
                onStructureUpdate={setStructureData}
            />
        )}

        {!mode && <TraceInput onLoad={handleLoadTrace} />}

        {/* Visual Visualization (Top Priority) */}
         <div className="mt-8">
            <VisualRenderer visual={executionState.visual} pointers={executionState.pointers} />
        </div>

        {/* Execution Context (Stack, Vars) */}
        <ExecutionPanel state={executionState} />

        <div className="mt-8">
            <h3 className="text-flow-text-muted text-sm font-semibold mb-3 uppercase tracking-wider">
                Event Log {trace.length > 0 && `(${trace.length} events)`}
            </h3>
            <div className="bg-flow-surface p-4 rounded border border-white/5 font-mono text-sm text-flow-text-muted h-32 overflow-y-auto">
                {trace.map((event, index) => (
                    <div
                        key={index}
                        className={`p-1 ${
                            index === currentStep
                                ? "bg-flow-accent-primary/10 text-flow-accent-primary"
                                : "opacity-50"
                        }`}
                    >
                        [{index}] {event.type} {event.type === 'call' || event.type === 'return' ? event.fn : ''}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="p-12 text-flow-text text-center">Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}


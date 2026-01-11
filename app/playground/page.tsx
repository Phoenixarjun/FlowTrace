"use client";

import { useState } from "react";
import { TraceEvent, ExecutionState } from "@/types/trace";
import { initialExecutionState } from "@/lib/initialState";
import { reduceEvent } from "@/lib/traceReducer";

// Hardcoded demo trace
const DEMO_TRACE: TraceEvent[] = [
  { type: "call", fn: "main" },
  { type: "state", key: "x", value: 10 },
  { type: "call", fn: "helper" },
  { type: "pointer", from: "head", to: "node1" },
  { type: "return", fn: "helper" },
];

export default function PlaygroundPage() {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [executionState, setExecutionState] = useState<ExecutionState>(
    initialExecutionState
  );

  const handleNext = () => {
    if (currentStep < DEMO_TRACE.length - 1) {
      const nextStepIndex = currentStep + 1;
      const event = DEMO_TRACE[nextStepIndex];
      
      // Compute new state using the pure reducer
      const newState = reduceEvent(executionState, event);
      
      setExecutionState(newState);
      setCurrentStep(nextStepIndex);
    }
  };

  const handleReset = () => {
    setExecutionState(initialExecutionState);
    setCurrentStep(-1);
  };

  return (
    <main className="flex-1 p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-4xl font-bold text-flow-text mb-2">Playground</h1>
          <p className="text-flow-text-muted">
            Phase 3 Debugger (No Visuals)
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleNext}
            disabled={currentStep >= DEMO_TRACE.length - 1}
            className="px-4 py-2 bg-flow-accent-primary text-black font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Step Next
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-flow-surface border border-white/10 text-flow-text rounded hover:bg-white/5"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-flow-text">Trace Events</h2>
            <div className="bg-flow-surface p-4 rounded border border-white/5 font-mono text-sm text-flow-text-muted h-64 overflow-y-auto">
              {DEMO_TRACE.map((event, index) => (
                <div
                  key={index}
                  className={`p-1 ${
                    index === currentStep
                      ? "bg-flow-accent-secondary/20 text-flow-accent-secondary"
                      : ""
                  }`}
                >
                  [{index}] {JSON.stringify(event)}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-flow-text">Execution State</h2>
            <pre className="bg-flow-surface p-4 rounded border border-white/5 font-mono text-sm text-flow-accent-primary h-64 overflow-y-auto">
              {JSON.stringify(executionState, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

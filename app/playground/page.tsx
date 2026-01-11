"use client";

import { useState } from "react";
import { TraceEvent, ExecutionState } from "@/types/trace";
import { initialExecutionState } from "@/lib/initialState";
import { reduceEvent } from "@/lib/traceReducer";
import ExecutionPanel from "@/components/ExecutionPanel";

// Hardcoded demo trace
const DEMO_TRACE: TraceEvent[] = [
  { type: "call", fn: "main" },
  { type: "state", key: "x", value: 10 },
  { type: "call", fn: "helper" },
  { type: "pointer", from: "head", to: "node1" },
  { type: "return", fn: "helper" },
  { type: "state", key: "x", value: 20 },
  { type: "call", fn: "finish" },
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
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-flow-text mb-2">Playground</h1>
            <p className="text-flow-text-muted">
              Visual Execution Primitives (Phase 4)
            </p>
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
              disabled={currentStep >= DEMO_TRACE.length - 1}
              className="px-4 py-2 bg-flow-accent-primary text-black font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Step Next
            </button>
          </div>
        </div>

        <ExecutionPanel state={executionState} />

        <div className="mt-8">
            <h3 className="text-flow-text-muted text-sm font-semibold mb-3 uppercase tracking-wider">
                Event Log
            </h3>
            <div className="bg-flow-surface p-4 rounded border border-white/5 font-mono text-sm text-flow-text-muted h-32 overflow-y-auto">
                {DEMO_TRACE.map((event, index) => (
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

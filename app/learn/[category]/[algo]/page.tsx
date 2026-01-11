"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LINEAR_SEARCH_LESSON } from "@/lib/lessons/linkedList/linearSearch";
import { Lesson } from "@/types/lesson";
import VisualRenderer from "@/components/visuals/VisualRenderer";
import ExecutionPanel from "@/components/ExecutionPanel"; // For Stack/State
import { initialExecutionState } from "@/lib/initialState";
import { reduceEvent } from "@/lib/traceReducer";
import { ExecutionState } from "@/types/trace";

// Lesson Registry
const LESSON_MAP: Record<string, Lesson> = {
  "linear-search": LINEAR_SEARCH_LESSON,
};

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ category: string; algo: string }>;
}) {
  const { category, algo } = await params;
  const lesson = LESSON_MAP[algo];

  if (!lesson) {
    return <div className="p-12 text-flow-text">Lesson not found.</div>;
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [traceStepIndex, setTraceStepIndex] = useState(-1);

  const currentLessonStep = lesson.steps[currentStepIndex];
  
  // Re-calculate trace state on every step change or trace step change
  // We need to replay the specific trace for this lesson step
  const executionState: ExecutionState = useMemo(() => {
    let state = initialExecutionState;
    // Process all events up to traceStepIndex
    const trace = currentLessonStep.trace;
    if (traceStepIndex >= 0 && traceStepIndex < trace.length) {
        for(let i=0; i<=traceStepIndex; i++) {
            state = reduceEvent(state, trace[i]);
        }
    } else if (trace.length > 0 && traceStepIndex === -1) {
        // Initial state for this visual? 
        // Ideally we might want to pre-load the 'setup' part, but let's stick to strict replay.
        // If trace is just for this step, we start fresh unless we chain state (complexity!).
        // PROMPT SAYS: "Each step loads a different trace". So we reset.
    }
    return state;
  }, [currentLessonStep, traceStepIndex]);

  // Handlers
  const handlePrevLessonStep = () => {
    if (currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
        setTraceStepIndex(-1);
    }
  };

  const handleNextLessonStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
        setTraceStepIndex(-1);
    }
  };

  const handleTraceNext = () => {
      if (traceStepIndex < currentLessonStep.trace.length - 1) {
          setTraceStepIndex(prev => prev + 1);
      }
  };

    const handleTracePrev = () => {
      if (traceStepIndex > -1) {
          setTraceStepIndex(prev => prev - 1);
      }
  };

  const handleTraceReset = () => {
      setTraceStepIndex(-1);
  };

  const isTraceAutoPlay = false; // Phase 2: Add auto-play

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 bg-flow-surface flex items-center justify-between">
        <div className="flex items-center gap-4">
             <Link href={`/learn/${category}`} className="text-flow-text-muted hover:text-flow-text text-sm">
                ← Back
            </Link>
            <h1 className="text-xl font-bold text-flow-text">
                {lesson.title}: <span className="text-flow-text-muted font-normal">{currentLessonStep.title}</span>
            </h1>
        </div>
        <div className="text-sm text-flow-text-muted">
            Step {currentStepIndex + 1} of {lesson.steps.length}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Explanation */}
        <div className="w-1/3 p-8 border-r border-white/5 overflow-y-auto bg-[#0B0F14]">
            <h2 className="text-2xl font-bold text-flow-accent-primary mb-6">
                {currentLessonStep.title}
            </h2>
            <div className="prose prose-invert max-w-none text-flow-text-leading">
                <p>{currentLessonStep.explanation}</p>
            </div>

            {/* Lesson Navigation */}
            <div className="mt-12 flex gap-4">
                <button
                    onClick={handlePrevLessonStep}
                    disabled={currentStepIndex === 0}
                    className="px-4 py-2 rounded border border-white/10 text-flow-text hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    Previous Step
                </button>
                <button
                    onClick={handleNextLessonStep}
                    disabled={currentStepIndex === lesson.steps.length - 1}
                    className="flex-1 px-4 py-2 rounded bg-flow-accent-primary text-black font-semibold hover:bg-flow-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next Step
                </button>
            </div>
        </div>

        {/* Right: Visualization */}
        <div className="flex-1 flex flex-col bg-[#0f1218]">
            {/* Visual Control Bar */}
            <div className="p-4 border-b border-white/5 flex items-center justify-center gap-4 bg-[#141820]">
                <button onClick={handleTraceReset} disabled={traceStepIndex === -1} className="text-flow-text-muted hover:text-flow-text disabled:opacity-30">
                    Reset
                </button>
                <button onClick={handleTracePrev} disabled={traceStepIndex === -1} className="text-flow-text-muted hover:text-flow-text disabled:opacity-30">
                     Back
                </button>
                 <div className="text-flow-text font-mono text-sm w-24 text-center">
                    {traceStepIndex + 1} / {currentLessonStep.trace.length}
                </div>
                <button onClick={handleTraceNext} disabled={traceStepIndex >= currentLessonStep.trace.length - 1} className="px-3 py-1 bg-flow-text text-black text-sm rounded disabled:opacity-50">
                    Next Op
                </button>
            </div>

            {/* Visual Canvas */}
            <div className="flex-1 p-8 overflow-auto flex flex-col gap-6">
                 {/* 1. Structural View */}
                 <VisualRenderer 
                    visual={executionState.visual} 
                    pointers={executionState.pointers} 
                 />

                 {/* 2. Logic State Views (Stack/Vars) */}
                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-flow-surface rounded border border-white/5 p-4">
                         <h3 className="text-flow-text-muted text-xs uppercase mb-2">Variables</h3>
                         <pre className="font-mono text-sm text-flow-text">
                             {JSON.stringify(executionState.state, null, 2)}
                         </pre>
                    </div>
                     <div className="bg-flow-surface rounded border border-white/5 p-4">
                         <h3 className="text-flow-text-muted text-xs uppercase mb-2">Call Stack</h3>
                         <div className="space-y-1">
                             {executionState.stack.length === 0 ? <span className="text-flow-text-muted italic text-xs">Empty</span> : null}
                             {executionState.stack.map((frame, i) => (
                                 <div key={i} className="border-l-2 border-flow-accent-secondary pl-2 text-sm text-flow-text font-mono">
                                     {frame}
                                 </div>
                             ))}
                         </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { TraceEvent } from "@/types/trace";
import { linkedListOps } from "@/lib/operations/linkedListOps";
import { stackQueueOps } from "@/lib/operations/stackQueueOps";

type Mode = "linked-list" | "stack" | "queue" | "other";

export default function OperationsPanel({
  mode,
  onTraceGenerated,
  currentStructure,
  onStructureUpdate
}: {
  mode: string;
  onTraceGenerated: (trace: TraceEvent[]) => void;
  currentStructure: string[];
  onStructureUpdate: (newStructure: string[]) => void;
}) {
  const [val, setVal] = useState("");

  const handleAdd = () => {
      if (!val) return;
      if (mode === "linked-list") {
          const { newStructure, trace } = linkedListOps.add(currentStructure, val);
          onStructureUpdate(newStructure);
          onTraceGenerated(trace);
      } else if (mode === "stack") {
          const { newStructure, trace } = stackQueueOps.push(currentStructure, val);
          onStructureUpdate(newStructure);
          onTraceGenerated(trace);
      } else if (mode === "queue") {
          const { newStructure, trace } = stackQueueOps.enqueue(currentStructure, val);
          onStructureUpdate(newStructure);
          onTraceGenerated(trace);
      }
      setVal("");
  };

  const handleDelete = () => {
       if (mode === "linked-list") {
           if (!val) return;
           const { newStructure, trace } = linkedListOps.delete(currentStructure, val);
           onStructureUpdate(newStructure);
           onTraceGenerated(trace);
           setVal("");
       } else if (mode === "stack") {
           const { newStructure, trace } = stackQueueOps.pop(currentStructure);
           onStructureUpdate(newStructure);
           onTraceGenerated(trace);
       } else if (mode === "queue") {
           const { newStructure, trace } = stackQueueOps.dequeue(currentStructure);
           onStructureUpdate(newStructure);
           onTraceGenerated(trace);
       }
  };

  const handleUpdate = () => {
      if (mode === "linked-list" && val.includes(",")) {
          const [oldVal, newVal] = val.split(",").map(s => s.trim());
          if (oldVal && newVal) {
              const { newStructure, trace } = linkedListOps.update(currentStructure, oldVal, newVal);
              onStructureUpdate(newStructure);
              onTraceGenerated(trace);
              setVal("");
          }
      }
  };

  const handleSearch = () => {
      if (mode === "linked-list" && val) {
          const { trace } = linkedListOps.search(currentStructure, val);
          onTraceGenerated(trace);
      }
  };

  if (!["linked-list", "stack", "queue"].includes(mode)) return null;

  return (
    <div className="bg-flow-surface border-t border-white/5 p-4 flex flex-wrap gap-4 items-center justify-center">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={mode === "linked-list" ? "Value (or old,new)" : "Value..."}
        className="px-3 py-2 rounded bg-black/20 border border-white/10 text-white w-48 focus:border-flow-accent-primary outline-none"
      />
      
      {mode === "linked-list" && (
        <>
            <button onClick={handleAdd} className="btn-primary">Add (Tail)</button>
            <button onClick={handleDelete} className="btn-secondary">Delete</button>
            <button onClick={handleUpdate} className="btn-secondary">Update</button>
            <button onClick={handleSearch} className="btn-secondary">Search</button>
        </>
      )}

      {mode === "stack" && (
        <>
            <button onClick={handleAdd} className="btn-primary">Push</button>
            <button onClick={handleDelete} className="btn-secondary">Pop</button>
        </>
      )}

      {mode === "queue" && (
        <>
            <button onClick={handleAdd} className="btn-primary">Enqueue</button>
            <button onClick={handleDelete} className="btn-secondary">Dequeue</button>
        </>
      )}

       <style jsx>{`
        .btn-primary {
            @apply px-4 py-2 bg-flow-accent-primary text-black font-semibold rounded hover:bg-flow-accent-primary/90 transition-colors;
        }
        .btn-secondary {
            @apply px-4 py-2 bg-flow-surface border border-white/10 text-flow-text rounded hover:bg-white/5 transition-colors;
        }
      `}</style>
    </div>
  );
}

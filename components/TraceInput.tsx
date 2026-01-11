"use client";

import { useState } from "react";
import { TraceEvent } from "@/types/trace";

export default function TraceInput({
  onLoad,
}: {
  onLoad: (trace: TraceEvent[]) => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);

      if (!Array.isArray(parsed)) {
        throw new Error("Input must be a JSON array.");
      }

      if (parsed.length === 0) {
        // Technically strict, but we can allow it or warn.
        // Let's allow it as a trivial case.
      }

      // Basic schema validation
      for (let i = 0; i < parsed.length; i++) {
        const item = parsed[i];
        if (!item || typeof item !== "object") {
          throw new Error(`Item at index ${i} is not an object.`);
        }
        if (
          !["call", "return", "state", "pointer"].includes(item.type)
        ) {
          throw new Error(
            `Item at index ${i} has invalid type '${item.type}'. Allowed: call, return, state, pointer.`
          );
        }
        // Could validate 'fn', 'key', 'to' presence here, but minimizing overkill per instructions.
      }

      onLoad(parsed as TraceEvent[]); // Cast is safe-ish after checks
    } catch (err: any) {
      setError(err.message || "Invalid JSON input.");
    }
  };

  return (
    <div className="bg-flow-surface rounded border border-white/5 p-4 mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="text-flow-text text-sm font-semibold uppercase tracking-wider">
          Inject Trace (JSON)
        </label>
        {error && <span className="text-flow-error text-sm font-bold">{error}</span>}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='[ {"type": "call", "fn": "main"} ]'
        className="w-full h-32 bg-black/20 border border-white/10 text-flow-accent-primary font-mono text-sm p-3 rounded focus:outline-none focus:border-flow-accent-primary transition-colors resize-y mb-3"
      />
      <button
        onClick={handleLoad}
        disabled={!input.trim()}
        className="px-4 py-2 bg-flow-surface border border-flow-accent-primary/50 text-flow-accent-primary text-sm font-medium rounded hover:bg-flow-accent-primary hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Load Trace
      </button>
    </div>
  );
}

"use client";

import { VisualModel } from "@/types/trace";

export default function DPTableView({
  model,
  pointers = {},
}: {
  model: Extract<VisualModel, { type: "dpTable" }>;
  pointers?: Record<string, string | null>;
}) {
  const { rows, cols, values } = model;

  return (
    <div className="w-full h-full p-4 overflow-auto flex items-center justify-center">
      <table className="border-separate border-spacing-1">
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => {
                const val = values[r]?.[c];
                const isSet = val !== undefined && val !== null;
                
                // Highlight logic:
                // If a pointer's value matches the index? 
                // Usually DP pointers are indices like i, j.
                // Let's check if any pointer value == index.
                // Assuming pointers store stringified indices or keys.
                // For 1D DP: pointer value == c
                // For 2D DP: pointer value == r,c or something? 
                // Let's support 1D index matching for now (e.g. i=3 points to col 3)
                
                const activePointers = Object.entries(pointers)
                    .filter(([name, val]) => val !== null && String(val) === String(c)) // Simple column match for now
                    .map(([name]) => name);
                
                const isFocused = activePointers.length > 0;

                return (
                  <td
                    key={c}
                    className="relative w-14 h-14 border border-white/10 text-center font-mono text-sm text-flow-text rounded transition-all duration-300"
                    style={{
                        backgroundColor: isFocused 
                            ? "rgba(34, 197, 94, 0.2)" 
                            : isSet ? "rgba(56, 189, 248, 0.05)" : "transparent",
                        borderColor: isFocused ? "#22C55E" : "rgba(255, 255, 255, 0.1)",
                        transform: isFocused ? "scale(1.1)" : "scale(1)",
                        boxShadow: isFocused ? "0 0 10px rgba(34, 197, 94, 0.3)" : "none"
                    }}
                  >
                    {isSet ? val : ""}
                    
                    {/* Tiny badges for pointers */}
                    {isFocused && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
                            {activePointers.map(p => (
                                <span key={p} className="text-[10px] bg-green-500 text-black px-1 rounded font-bold">
                                    {p}
                                </span>
                            ))}
                        </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

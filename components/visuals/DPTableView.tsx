"use client";

import { VisualModel } from "@/types/trace";

export default function DPTableView({
  model,
}: {
  model: Extract<VisualModel, { type: "dpTable" }>;
}) {
  const { rows, cols, values } = model;

  return (
    <div className="w-full h-full p-4 overflow-auto flex items-center justify-center">
      <table className="border-collapse border border-white/10">
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => {
                const val = values[r]?.[c];
                const isSet = val !== undefined && val !== null; // Simple check, or -1/Infinity check
                
                return (
                  <td
                    key={c}
                    className="w-12 h-12 border border-white/10 text-center font-mono text-sm text-flow-text"
                    style={{
                        // Highlight if value is recently set? 
                        // For now just basic render.
                        backgroundColor: isSet ? "rgba(56, 189, 248, 0.05)" : "transparent"
                    }}
                  >
                    {isSet ? val : ""}
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

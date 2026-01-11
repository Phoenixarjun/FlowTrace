"use client";

import { useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { VisualModel } from "@/types/trace";

export default function LinkedListView({
  model,
  pointers = {},
}: {
  model: Extract<VisualModel, { type: "list" }>;
  pointers?: Record<string, string | null>;
}) {
  const { nodes: dataNodes, links } = model;

  // Convert to React Flow format
  // Simple horizontal layout: Node 0 at (0,0), Node 1 at (200, 0), etc.
  const nodes: Node[] = useMemo(() => {
    return dataNodes.map((label, index) => {
      // Check if any pointer points to this node
      const activePointers = Object.entries(pointers)
        .filter(([_, target]) => target === label)
        .map(([name]) => name);

      const isFocused = activePointers.length > 0;
      
      return {
        id: label,
        data: { 
            label: label,
            // We could pass pointers to a custom node if we wanted to render badges
        },
        position: { x: index * 150, y: 100 },
        style: {
          background: isFocused ? "#1F2937" : "#111827", // Lighter surface if active
          color: isFocused ? "#38BDF8" : "#E5E7EB", // Accent text if active
          border: isFocused ? "2px solid #22C55E" : "1px solid #38BDF8", // Green border if active
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontFamily: "monospace",
          boxShadow: isFocused ? "0 0 10px rgba(34, 197, 94, 0.3)" : "none",
        },
      };
    }).concat(
        // Check for Explicit Nulls in links
        links.some(([_, target]) => target === null) ? [{
            id: "null",
            data: { label: "null" },
            position: { x: dataNodes.length * 150, y: 100 },
            style: {
                background: "transparent",
                color: "#9CA3AF",
                border: "1px dashed #9CA3AF",
                borderRadius: "4px",
                width: 40,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontFamily: "monospace",
                boxShadow: "none"
            }
        }] : []
    );
  }, [dataNodes, links]);

  const edges: Edge[] = useMemo(() => {
    return links.map(([source, target], i) => ({
      id: `e-${i}`,
      source: source,
      target: target === null ? "null" : target,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#9CA3AF",
      },
      style: { stroke: "#9CA3AF" },
    }));
  }, [links]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      attributionPosition="bottom-right"
    >
      <Background color="#333" gap={16} />
      <Controls className="bg-flow-surface border-white/10" />
    </ReactFlow>
  );
}

"use client";

import { useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import { VisualModel } from "@/types/trace";

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    // For general graphs, dagre might not be perfect, but it's better than nothing.
    // Ideally we'd use a force layout, but avoiding heavy libraries.
    // Using dagre with different settings.
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: "LR" }); // Left-to-Right for general graphs?

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 50, height: 50 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - 25,
      y: nodeWithPosition.y - 25,
    };
  });

  return { nodes, edges };
};

export default function GraphView({
  model,
}: {
  model: Extract<VisualModel, { type: "graph" }>;
}) {
  const { nodes: dataNodes, edges: dataEdges } = model;

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const rawNodes: Node[] = dataNodes.map((label) => ({
      id: label,
      data: { label: label },
      position: { x: 0, y: 0 },
      style: {
        background: "#111827",
        color: "#E5E7EB",
        border: "1px solid #F59E0B", // Warning color for generic graphs
        borderRadius: "50%",
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontFamily: "monospace",
      },
    }));

    const rawEdges: Edge[] = dataEdges.map(([source, target], i) => ({
      id: `e-${i}`,
      source: source,
      target: target,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#9CA3AF",
      },
      style: { stroke: "#9CA3AF" },
    }));

    return getLayoutedElements(rawNodes, rawEdges);
  }, [dataNodes, dataEdges]);

  return (
    <ReactFlow
      nodes={layoutedNodes}
      edges={layoutedEdges}
      fitView
      attributionPosition="bottom-right"
    >
      <Background color="#333" gap={16} />
      <Controls className="bg-flow-surface border-white/10" />
    </ReactFlow>
  );
}

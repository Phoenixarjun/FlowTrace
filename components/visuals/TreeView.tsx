"use client";

import { useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import { VisualModel } from "@/types/trace";

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: "TB" });

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

export default function TreeView({
  model,
}: {
  model: Extract<VisualModel, { type: "tree" }>;
}) {
  const { nodes: dataNodes } = model;

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const rawNodes: Node[] = dataNodes.map((n) => ({
      id: n.id,
      data: { label: n.id },
      position: { x: 0, y: 0 }, // Laid out by dagre
      style: {
        background: "#111827",
        color: "#E5E7EB",
        border: "1px solid #22C55E", // Secondary accent for trees
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

    const rawEdges: Edge[] = [];
    dataNodes.forEach((parent) => {
      parent.children.forEach((childId) => {
        rawEdges.push({
          id: `${parent.id}-${childId}`,
          source: parent.id,
          target: childId,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#9CA3AF",
          },
          style: { stroke: "#9CA3AF" },
        });
      });
    });

    return getLayoutedElements(rawNodes, rawEdges);
  }, [dataNodes]);

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

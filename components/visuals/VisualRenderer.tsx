import { VisualModel } from "@/types/trace";
import LinkedListView from "./LinkedListView";
import TreeView from "./TreeView";
import GraphView from "./GraphView";
import DPTableView from "./DPTableView";

export default function VisualRenderer({
  visual,
  pointers = {},
}: {
  visual: VisualModel | null;
  pointers?: Record<string, string | null>;
}) {
  if (!visual) {
    return (
      <div className="bg-flow-surface rounded border border-white/5 p-8 flex items-center justify-center h-[400px]">
        <span className="text-flow-text-muted text-sm italic">
          No active structure visualization
        </span>
      </div>
    );
  }

  const renderVisual = () => {
    switch (visual.type) {
      case "list":
        return <LinkedListView model={visual} pointers={pointers} />;
      case "tree":
        return <TreeView model={visual} />;
      case "graph":
        return <GraphView model={visual} />;
      case "dpTable":
        return <DPTableView model={visual} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-flow-surface rounded border border-white/5 p-4 h-[500px] flex flex-col">
      <h3 className="text-flow-text-muted text-sm font-semibold mb-3 uppercase tracking-wider">
        Structure View: {visual.type}
      </h3>
      <div className="flex-1 overflow-hidden relative border border-white/5 rounded bg-black/20">
        {renderVisual()}
      </div>
    </div>
  );
}

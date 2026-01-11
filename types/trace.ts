export type VisualModel =
  | {
      type: "list";
      nodes: string[];
      links: [string, string | null][];
    }
  | {
      type: "tree";
      nodes: { id: string; children: string[] }[];
    }
  | {
      type: "graph";
      nodes: string[];
      edges: [string, string][];
    }
  | {
      type: "dpTable";
      rows: number;
      cols: number;
      values: number[][];
    };

export type TraceEvent =
  | { type: "call"; fn: string }
  | { type: "return"; fn: string }
  | { type: "state"; key: string; value: any }
  | { type: "pointer"; from: string; to: string | null }
  | VisualModel;

export type ExecutionState = {
  stack: string[];
  state: Record<string, any>;
  pointers: Record<string, string | null>;
  visual: VisualModel | null;
};

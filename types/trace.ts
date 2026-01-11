export type TraceEvent =
  | { type: "call"; fn: string }
  | { type: "return"; fn: string }
  | { type: "state"; key: string; value: any }
  | { type: "pointer"; from: string; to: string | null };

export type ExecutionState = {
  stack: string[];
  state: Record<string, any>;
  pointers: Record<string, string | null>;
};

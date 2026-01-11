import { ExecutionState, TraceEvent } from "@/types/trace";

export function reduceEvent(
  state: ExecutionState,
  event: TraceEvent
): ExecutionState {
  switch (event.type) {
    case "call":
      return {
        ...state,
        stack: [...state.stack, event.fn],
      };
    case "return":
      // In a strict replay, we just pop. 
      // Validation could happen here, but we trust the trace for now.
      return {
        ...state,
        stack: state.stack.slice(0, -1),
      };
    case "state":
      return {
        ...state,
        state: {
          ...state.state,
          [event.key]: event.value,
        },
      };
    case "pointer":
      return {
        ...state,
        pointers: {
          ...state.pointers,
          [event.from]: event.to,
        },
      };
    case "list":
    case "tree":
    case "graph":
    case "dpTable":
    case "stack":
    case "queue":
      return {
        ...state,
        visual: event,
      };
    default:
      return state;
  }
}

import { ExecutionState, TraceEvent } from "@/types/trace";
import { initialExecutionState } from "@/lib/initialState";
import { reduceEvent } from "@/lib/traceReducer";

export class TracePlayer {
  private events: TraceEvent[];
  private currentStep: number;
  private state: ExecutionState;

  constructor(events: TraceEvent[]) {
    this.events = events;
    this.currentStep = -1; // Points to the index of the *last applied* event
    this.state = initialExecutionState;
  }

  public get currentState(): ExecutionState {
    return this.state;
  }

  public get stepIndex(): number {
    return this.currentStep;
  }

  public next(): ExecutionState {
    if (this.currentStep < this.events.length - 1) {
      this.currentStep++;
      const event = this.events[this.currentStep];
      this.state = reduceEvent(this.state, event);
    }
    return this.state;
  }

  public reset(): ExecutionState {
    this.currentStep = -1;
    this.state = initialExecutionState;
    return this.state;
  }

  // Helper to re-hydrate/seek if needed in future phases
  public seek(step: number): ExecutionState {
    this.reset();
    while (this.currentStep < step && this.currentStep < this.events.length - 1) {
      this.next();
    }
    return this.state;
  }
}

import { ExecutionState } from "@/types/trace";
import StackView from "./StackView";
import StateView from "./StateView";
import PointerView from "./PointerView";

export default function ExecutionPanel({ state }: { state: ExecutionState }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
      <div className="h-full">
        <StackView stack={state.stack} />
      </div>
      <div className="h-full">
        <StateView state={state.state} />
      </div>
      <div className="h-full">
        <PointerView pointers={state.pointers} />
      </div>
    </div>
  );
}

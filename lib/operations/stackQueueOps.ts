import { TraceEvent } from "@/types/trace";

function generateListVisual(nodes: string[]) {
    const links: [string, string | null][] = [];
    for (let i = 0; i < nodes.length; i++) {
        const next = i < nodes.length - 1 ? nodes[i + 1] : null;
        links.push([nodes[i], next]);
    }
    return {
        type: "list" as const,
        nodes: nodes,
        links: links
    };
}

export const stackQueueOps = {
    // Stack: LIFO (Add to front/top, Remove from front/top)
    // For visual clarity in a "List" view, let's treat index 0 as TOP.
    push: (currentStack: string[], value: string): { newStructure: string[], trace: TraceEvent[] } => {
        const newStack = [value, ...currentStack]; // Prepend
        const trace: TraceEvent[] = [
            { type: "call", fn: `push(${value})` },
            { type: "pointer", from: "top", to: currentStack[0] || null },
            { type: "state", key: "action", value: "Create Node" },
            { ...generateListVisual(newStack) },
            { type: "pointer", from: "top", to: value },
            { type: "return", fn: "push" }
        ];
        return { newStructure: newStack, trace };
    },

    pop: (currentStack: string[]): { newStructure: string[], trace: TraceEvent[] } => {
         if (currentStack.length === 0) {
             return { 
                 newStructure: [], 
                 trace: [{ type: "call", fn: "pop" }, { type: "state", key: "error", value: "Underflow" }, { type: "return", fn: "pop" }] 
             };
         }
         const val = currentStack[0];
         const newStack = currentStack.slice(1);
         
         const trace: TraceEvent[] = [
             { type: "call", fn: "pop" },
             { type: "pointer", from: "top", to: val },
             { type: "state", key: "popped", value: val },
             { ...generateListVisual(newStack) },
             { type: "pointer", from: "top", to: newStack[0] || null },
             { type: "return", fn: "pop" }
         ];
         return { newStructure: newStack, trace };
    },

    // Queue: FIFO (Add to end, Remove from front)
    enqueue: (currentQueue: string[], value: string): { newStructure: string[], trace: TraceEvent[] } => {
        const newQueue = [...currentQueue, value];
        const trace: TraceEvent[] = [
            { type: "call", fn: `enqueue(${value})` },
            { ...generateListVisual(currentQueue) },
            { type: "state", key: "action", value: "Append to Tail" },
            { ...generateListVisual(newQueue) },
            { type: "state", key: "tail", value: value },
            { type: "return", fn: "enqueue" }
        ];
        return { newStructure: newQueue, trace };
    },
    
    dequeue: (currentQueue: string[]): { newStructure: string[], trace: TraceEvent[] } => {
        if (currentQueue.length === 0) {
             return { 
                 newStructure: [], 
                 trace: [{ type: "call", fn: "dequeue" }, { type: "state", key: "error", value: "Underflow" }, { type: "return", fn: "dequeue" }] 
             };
        }
        const val = currentQueue[0];
        const newQueue = currentQueue.slice(1);
        
        const trace: TraceEvent[] = [
             { type: "call", fn: "dequeue" },
             { type: "state", key: "serving", value: val },
             { ...generateListVisual(newQueue) },
             { type: "return", fn: "dequeue" }
         ];
        return { newStructure: newQueue, trace };
    }
};

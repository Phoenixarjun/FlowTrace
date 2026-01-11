import { TraceEvent } from "@/types/trace";

// Helper to generate the list visual model from an array
function generateListVisual(nodes: string[], highlightNode: string | null = null) {
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

export const linkedListOps = {
    add: (currentList: string[], value: string): { newStructure: string[], trace: TraceEvent[] } => {
        const newList = [...currentList, value];
        const trace: TraceEvent[] = [];

        // 1. Start Op
        trace.push({ type: "call", fn: `add(${value})` });
        
        // 2. Traversal if list not empty
        let current = currentList.length > 0 ? currentList[0] : null;
        
        if (current) {
            trace.push({ type: "pointer", from: "current", to: current });
            trace.push({ ...generateListVisual(currentList) });
            
            for(let i=0; i<currentList.length; i++) {
                 trace.push({ type: "pointer", from: "current", to: currentList[i] });
                 // Small visual wait or check?
                 if (i < currentList.length - 1) {
                     trace.push({ type: "state", key: "check", value: "next != null" });
                 } else {
                     trace.push({ type: "state", key: "check", value: "next == null (Found Tail)" });
                 }
            }
        }

        // 3. Link new node
        trace.push({ type: "state", key: "action", value: "Link New Node" });
        trace.push({ ...generateListVisual(newList) }); // Show new node connected
        trace.push({ type: "pointer", from: "current", to: value }); // Move pointer to new node
        
        // 4. Return
        trace.push({ type: "return", fn: "add" });

        return { newStructure: newList, trace };
    },

    delete: (currentList: string[], value: string): { newStructure: string[], trace: TraceEvent[] } => {
        const index = currentList.indexOf(value);
        if (index === -1) {
             // Not found trace
             const trace: TraceEvent[] = [
                 { type: "call", fn: `delete(${value})` },
                 { type: "list", ...generateListVisual(currentList) },
                 { type: "state", key: "error", value: "Value not found" },
                 { type: "return", fn: "delete" }
             ];
             return { newStructure: currentList, trace };
        }

        const newList = currentList.filter(v => v !== value);
        const trace: TraceEvent[] = [];
        
        trace.push({ type: "call", fn: `delete(${value})` });
        trace.push({ type: "list", ...generateListVisual(currentList) });

        // Traversal
        let prev = null;
        for(let i=0; i<=index; i++) {
            const currNode = currentList[i];
            trace.push({ type: "pointer", from: "current", to: currNode });
            if (prev) {
                 trace.push({ type: "pointer", from: "prev", to: prev });
            }

            if (currNode === value) {
                trace.push({ type: "state", key: "found", value: true });
                // Visual delete
                trace.push({ type: "state", key: "action", value: "Unlink Node" });
                // Show new structure
                trace.push({ ...generateListVisual(newList) });
                break;
            }
            prev = currNode;
        }

        trace.push({ type: "return", fn: "delete" });
        return { newStructure: newList, trace };
    },

    search: (currentList: string[], value: string): { trace: TraceEvent[] } => {
         const trace: TraceEvent[] = [];
         trace.push({ type: "call", fn: `search(${value})` });
         trace.push({ ...generateListVisual(currentList) });

         let found = false;
         for(let i=0; i<currentList.length; i++) {
             const node = currentList[i];
             trace.push({ type: "pointer", from: "current", to: node });
             trace.push({ type: "state", key: "check", value: `${node} == ${value}?` });
             
             if (node === value) {
                 found = true;
                 trace.push({ type: "state", key: "found", value: true });
                 break;
             }
         }

         if (!found) {
             trace.push({ type: "state", key: "found", value: false });
         }

         trace.push({ type: "return", fn: "search" });
         return { trace };
    },

    update: (currentList: string[], indexOrVal: string, newVal: string): { newStructure: string[], trace: TraceEvent[] } => {
        // For simplicity, search by value then update? Or index?
        // Prompt says "update (value replace)". Implies search for old, replace with new.
        const index = currentList.indexOf(indexOrVal);
        if (index === -1) {
            return {
                newStructure: currentList,
                trace: [{ type: "call", fn: `update(${indexOrVal}, ${newVal})` }, { ...generateListVisual(currentList) }, { type: "state", key: "error", value: "Value not found" }, { type: "return", fn: "update" }]
            };
        }

        const newList = [...currentList];
        newList[index] = newVal;
        
        const trace: TraceEvent[] = [];
        trace.push({ type: "call", fn: `update(${indexOrVal}, ${newVal})` });
        trace.push({ ...generateListVisual(currentList) });
        
        // Traversal
        for(let i=0; i<=index; i++) {
            trace.push({ type: "pointer", from: "current", to: currentList[i] });
            if (currentList[i] === indexOrVal) {
                trace.push({ type: "state", key: "found", value: true });
                trace.push({ type: "state", key: "action", value: "Update Value" });
                trace.push({ ...generateListVisual(newList) });
                break;
            }
        }
        
        trace.push({ type: "return", fn: "update" });
        return { newStructure: newList, trace };
    }
};

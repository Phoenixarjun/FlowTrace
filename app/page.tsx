import Link from "next/link";

const CATEGORIES = [
  { id: "linked-list", name: "Linked List", description: "Learn nodes, pointers, and traversal." },
  { id: "stack", name: "Stack", description: "LIFO principle: Push and Pop." },
  { id: "queue", name: "Queue", description: "FIFO principle: Enqueue and Dequeue." },
  { id: "backtracking", name: "Backtracking", description: "Explore recursive search spaces." },
  { id: "trees", name: "Trees", description: "Hierarchical data structures." },
  { id: "graphs", name: "Graphs", description: "Nodes and edges network." },
  { id: "trie", name: "Trie", description: "Prefix trees for strings.", isAdvanced: true },
  { id: "dp", name: "Dynamic Programming", description: "Optimization tables.", isAdvanced: true },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-flow-accent-primary to-indigo-500 mb-6">
          FlowTrace
        </h1>
        <p className="text-xl text-flow-text-muted mb-8 max-w-2xl mx-auto">
          Learn algorithms by watching them execute. A visual playground for code structure and flow.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/playground"
            className="px-6 py-3 bg-flow-surface border border-white/10 rounded hover:border-flow-accent-primary hover:text-flow-accent-primary transition-all"
          >
            Open Playground
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-20 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-flow-text mb-8">Start Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/learn/${cat.id}`}
              className={`group p-6 bg-flow-surface border border-white/5 rounded-xl transition-all hover:bg-white/[0.02] ${
                cat.isAdvanced 
                  ? "border-indigo-500/30 hover:border-indigo-500" 
                  : "hover:border-flow-accent-primary"
              }`}
            >
              <h3 className={`text-xl font-semibold mb-2 group-hover:text-flow-text ${
                cat.isAdvanced ? "text-indigo-400 group-hover:text-indigo-300" : "text-flow-text group-hover:text-flow-accent-primary"
              }`}>
                {cat.name}
                {cat.isAdvanced && <span className="ml-2 text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">Advanced</span>}
              </h3>
              <p className="text-flow-text-muted text-sm">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

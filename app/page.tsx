import Link from "next/link";

const CATEGORIES = [
  { id: "linked-list", name: "Linked List", description: "Learn nodes, pointers, and traversal." },
  { id: "backtracking", name: "Backtracking", description: "Explore recursive search spaces." },
  { id: "trees", name: "Trees", description: "Hierarchical data structures." },
  { id: "graphs", name: "Graphs", description: "Nodes and edges network." },
  { id: "stack-queue", name: "Stack & Queue", description: "LIFO and FIFO principles." },
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
              className="group p-6 bg-flow-surface border border-white/5 rounded-xl hover:border-flow-accent-primary transition-all hover:bg-white/[0.02]"
            >
              <h3 className="text-xl font-semibold text-flow-text group-hover:text-flow-accent-primary mb-2">
                {cat.name}
              </h3>
              <p className="text-flow-text-muted text-sm">
                {cat.description}
              </p>
            </Link>
          ))}
          {/* Coming Soon */}
          <div className="p-6 bg-flow-surface border border-white/5 rounded-xl opacity-50 cursor-not-allowed">
            <h3 className="text-xl font-semibold text-flow-text-muted mb-2">
              Dynamic Programming
            </h3>
            <p className="text-flow-text-muted text-sm">
              Coming soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function ConceptsPage() {
  return (
    <main className="flex-1 p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-flow-text mb-6">Concepts</h1>
        <div className="space-y-4">
          <Link 
            href="/playground?demo=dfs"
            className="block p-6 bg-flow-surface rounded border border-white/5 hover:border-flow-accent-primary transition-colors hover:bg-white/[0.02]"
          >
            <h2 className="text-xl font-bold text-flow-accent-primary mb-2">
              Recursive DFS
            </h2>
            <p className="text-flow-text-muted">
              Visualize the "Max Area of Island" algorithm. Observe how the stack grows deep as we explore connected land cells, and how the return values bubble up to calculate the total area.
            </p>
          </Link>

          <div className="block p-6 bg-flow-surface rounded border border-white/5 opacity-50 cursor-not-allowed">
            <h2 className="text-xl font-bold text-flow-text-muted mb-2">
              Breadth-First Search (BFS)
            </h2>
            <p className="text-flow-text-muted">
              Coming soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

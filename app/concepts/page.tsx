export default function ConceptsPage() {
  const concepts = [
    "Recursion",
    "DFS / BFS",
    "Linked Lists",
    "Trees"
  ];

  return (
    <main className="flex-1 p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-flow-text mb-6">Concepts</h1>
        <ul className="space-y-4">
          {concepts.map((concept) => (
            <li
              key={concept}
              className="p-4 bg-flow-surface rounded border border-white/5 text-flow-text-muted hover:text-flow-text transition-colors"
            >
              {concept}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default function AboutPage() {
  return (
    <main className="flex-1 p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-flow-text">About FlowTrace</h1>
        
        <div className="prose prose-invert max-w-none text-flow-text-muted">
          <p className="text-lg">
            FlowTrace is a personal learning tool designed to demystify algorithm
            execution through visualization.
          </p>
          
          <h2 className="text-2xl font-semibold text-flow-accent-secondary mt-8 mb-4">
            Philosophy
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-flow-text">Determinism:</strong> We replay
              explicit traces, never guessing execution.
            </li>
            <li>
              <strong className="text-flow-text">Frontend-only:</strong> Logic
              runs entirely in your browser.
            </li>
            <li>
              <strong className="text-flow-text"> Clarity:</strong> Visual
              understanding over competitive coding speed.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

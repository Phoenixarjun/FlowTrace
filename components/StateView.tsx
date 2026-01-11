export default function StateView({ state }: { state: Record<string, any> }) {
  const entries = Object.entries(state);

  return (
    <div className="bg-flow-surface rounded border border-white/5 p-4 flex flex-col h-full">
      <h3 className="text-flow-text-muted text-sm font-semibold mb-3 uppercase tracking-wider">
        Variables
      </h3>
      {entries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-flow-text-muted text-sm italic">
          No State
        </div>
      ) : (
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {entries.map(([key, value]) => (
            <li
              key={key}
              className="flex items-center justify-between p-2 border-b border-white/5 last:border-0"
            >
              <span className="text-flow-text font-mono text-sm">{key}</span>
              <span className="text-flow-accent-secondary font-mono text-sm">
                {JSON.stringify(value)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

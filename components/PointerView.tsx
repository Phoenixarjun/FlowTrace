export default function PointerView({
  pointers,
}: {
  pointers: Record<string, string | null>;
}) {
  const entries = Object.entries(pointers);

  return (
    <div className="bg-flow-surface rounded border border-white/5 p-4 flex flex-col h-full">
      <h3 className="text-flow-text-muted text-sm font-semibold mb-3 uppercase tracking-wider">
        Pointers
      </h3>
      {entries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-flow-text-muted text-sm italic">
          No Pointers
        </div>
      ) : (
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {entries.map(([from, to]) => (
            <li
              key={from}
              className="flex items-center gap-2 p-2 border-b border-white/5 last:border-0"
            >
              <span className="text-flow-text font-mono text-sm">{from}</span>
              <span className="text-flow-text-muted">→</span>
              <span
                className={`font-mono text-sm ${
                  to ? "text-flow-accent-primary" : "text-flow-text-muted italic"
                }`}
              >
                {to || "null"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

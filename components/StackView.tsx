export default function StackView({ stack }: { stack: string[] }) {
  return (
    <div className="bg-flow-surface rounded border border-white/5 p-4 flex flex-col h-full">
      <h3 className="text-flow-text-muted text-sm font-semibold mb-3 uppercase tracking-wider">
        Call Stack
      </h3>
      {stack.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-flow-text-muted text-sm italic">
          Stack Empty
        </div>
      ) : (
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {/* Render regular items */}
          {stack.slice(0, stack.length - 1).reverse().map((frame, i) => (
             <li
              key={`${frame}-${i}`}
              className="p-2 border border-white/5 text-flow-text-muted text-sm rounded"
            >
              {frame}()
            </li>
          ))}
          {/* Highlight top of stack */}
          {stack.length > 0 && (
             <li className="p-2 bg-flow-accent-primary/10 border border-flow-accent-primary/20 text-flow-accent-primary text-sm font-medium rounded">
              {stack[stack.length - 1]}()
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-bold text-flow-accent-primary mb-6 tracking-tight">
        FlowTrace
      </h1>
      <p className="text-xl text-flow-text-muted max-w-2xl">
        A visual execution player for understanding algorithms.
      </p>
    </main>
  );
}

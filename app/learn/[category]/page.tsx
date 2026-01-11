import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS } from "@/lib/topicContent";

export default async function TopicPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const content = TOPICS[category];

  // Fallback for categories not in TOPICS yet or if ID mismatches
  if (!content) {
    // If not in TOPICS, maybe it's still being built?
    // User requested "Mandatory" topics. I have added content for them.
    // If invalid, 404.
     notFound();
  }

  return (
    <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
             <Link href="/" className="text-flow-text-muted hover:text-flow-text text-sm transition-colors">
                ← Back to Home
            </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-flow-text mb-4">
                {content.title}
            </h1>
            <p className="text-xl text-flow-text-muted">
                {content.subtitle}
            </p>
        </header>

        {/* 1. What is this? */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-flow-accent-primary mb-4">What is this?</h2>
            <p className="text-flow-text-leading text-lg leading-relaxed">
                {content.description}
            </p>
        </section>

        {/* 2. Why it matters */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-flow-accent-primary mb-4">Why it matters</h2>
            <p className="text-flow-text-leading text-lg leading-relaxed italic border-l-4 border-white/10 pl-6">
                "{content.intuition}"
            </p>
        </section>

         {/* 3. How it behaves */}
         <section className="mb-12">
            <h2 className="text-2xl font-bold text-flow-accent-primary mb-4">How it behaves</h2>
            <ul className="space-y-3">
                {content.behavior.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="text-flow-accent-secondary mt-1">●</span>
                        <span className="text-flow-text text-lg">{item}</span>
                    </li>
                ))}
            </ul>
        </section>

         {/* 4. Core operations */}
         <section className="mb-12">
            <h2 className="text-2xl font-bold text-flow-accent-primary mb-4">Core operations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {content.operations.map((op, idx) => (
                    <div key={idx} className="p-4 bg-flow-surface border border-white/5 rounded">
                        <span className="text-flow-text font-mono text-sm uppercase tracking-wider">
                            {op}
                        </span>
                    </div>
                ))}
            </div>
        </section>

         {/* 5. Visual Learning (Demo) */}
         <section className="mb-20 p-8 bg-flow-surface rounded-2xl border border-white/5 text-center">
            <h2 className="text-2xl font-bold text-flow-text mb-4">See it in action</h2>
            <p className="text-flow-text-muted mb-8 max-w-xl mx-auto">
                {content.isAdvanced 
                    ? "This is a foundational concept. We have a simplified static visualization ready for you." 
                    : "Watch how this structure handles data step-by-step in our visual playground."}
            </p>
            <Link 
                href={`/playground?demo=${content.demoKey}`}
                className="inline-block px-8 py-4 bg-flow-accent-primary text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
                Open Visual Demo
            </Link>
        </section>

         {/* Advanced Warning */}
         {content.isAdvanced && (
            <div className="p-4 rounded bg-indigo-500/10 border border-indigo-500/20 text-center text-sm text-indigo-300">
                Detailed problem walkthroughs for this topic will be coming in future updates.
            </div>
         )}
    </main>
  );
}

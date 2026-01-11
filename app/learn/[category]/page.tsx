import Link from "next/link";
import { notFound } from "next/navigation";

// Mimic a data source
const LESSONS: Record<string, { id: string; title: string }[]> = {
  "linked-list": [
    { id: "linear-search", title: "Linear Search" },
  ],
  // other categories will be empty for now
};

const CATEGORY_NAMES: Record<string, string> = {
    "linked-list": "Linked List",
    "backtracking": "Backtracking",
    "trees": "Trees",
    "graphs": "Graphs",
    "stack-queue": "Stack & Queue"
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryId = params.category;
  const categoryName = CATEGORY_NAMES[categoryId];
  const lessons = LESSONS[categoryId] || [];

  if (!categoryName) {
    notFound();
  }

  return (
    <main className="flex-1 p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-flow-text-muted hover:text-flow-text text-sm mb-6 inline-block">
            ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-flow-text mb-6">{categoryName}</h1>
        
        <div className="space-y-4">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/learn/${categoryId}/${lesson.id}`}
                className="block p-6 bg-flow-surface rounded border border-white/5 hover:border-flow-accent-primary transition-colors hover:bg-white/[0.02]"
              >
                <h2 className="text-xl font-bold text-flow-accent-primary mb-2">
                  {lesson.title}
                </h2>
                <p className="text-flow-text-muted">
                  Start learning this algorithm step-by-step.
                </p>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-flow-text-muted">
                No lessons available yet for this category.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

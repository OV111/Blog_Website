import { Link } from "react-router-dom";
import GradientText from "@/components/GradientText";
import { CATEGORY_OPTIONS } from "../../../constants/Categories";

export default function Books() {
  return (
    <div className="min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-12">
      <div className="pointer-events-none fixed -top-20 -left-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/20" />
      <div className="pointer-events-none fixed top-10 right-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/15" />

      <div className="mb-14 text-center">
        <GradientText
          colors={["#0d9488", "#06b6d4", "#14b8a6", "#22d3ee", "#0d9488"]}
          animationSpeed={7}
          showBorder={false}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
        >
          📚 Books
        </GradientText>
        <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto text-neutral-500 dark:text-neutral-400">
          Choose a category and we'll bring the books related!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {CATEGORY_OPTIONS.map((cat) => (
          <Link
            key={cat.id}
            to={`/coding-libs/books/${cat.slug}`}
            className="group flex flex-col gap-2 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-teal-400/60 dark:hover:border-teal-500/50 bg-white/50 dark:bg-neutral-900/50 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {cat.title}
            </h3>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-teal-500 transition-colors">
              Explore books →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

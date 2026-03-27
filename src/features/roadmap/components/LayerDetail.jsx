import { motion } from "framer-motion";
import { X, Clock, BookOpen, Code2, Layers } from "lucide-react";
import useRoadmapStore from "@/stores/useRoadmapStore";

const resourceTypeColor = {
  docs: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
  course: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300",
  video: "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-300",
  book: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300",
};

const LayerDetail = () => {
  const { activeLayer, closePanel } = useRoadmapStore();

  if (!activeLayer) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closePanel}
      />

      {/* Drawer */}
      <motion.div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
              Layer {activeLayer.order}
            </p>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 leading-snug">
              {activeLayer.title}
            </h2>
            <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
              <Clock size={11} />
              {activeLayer.estimatedTime}
            </span>
          </div>
          <button
            onClick={closePanel}
            className="mt-1 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {activeLayer.techs.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {activeLayer.description}
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
              <Layers size={13} />
              What you'll learn
            </h3>
            <ul className="space-y-2">
              {activeLayer.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
              <BookOpen size={13} />
              Resources
            </h3>
            <ul className="space-y-2">
              {activeLayer.resources.map((r, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                      {r.label}
                    </p>
                    <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                      {r.platform}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${resourceTypeColor[r.type] ?? ""}`}>
                    {r.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge */}
          <div className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/15 px-4 py-4">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-2">
              <Code2 size={13} />
              Layer Challenge
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {activeLayer.challenge}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LayerDetail;

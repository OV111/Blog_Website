import { motion, AnimatePresence } from "framer-motion";
import CategoryBar from "./components/CategotyBar";
import TrackSelector from "./components/TrackSelector";
import GradientText from "@/components/GradientText";
import useRoadmapStore from "../../stores/useRoadmapStore";
import FloatingLoad from "./components/FloatingLoad";

export default function RoadmapPage() {
  const { selectedCategory } = useRoadmapStore();

  return (
    <div className="min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-12">
      <div className="pointer-events-none fixed -top-20 -left-20 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-900/20" />
      <div className="pointer-events-none fixed top-10 right-10 h-72 w- 72 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-900/15" />
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold tracking-wide text-purple-600 dark:text-purple-500 drop-shadow-[0_0_20px_rgba(147,51,234,0.2)] dark:drop-shadow-[0_0_16px_rgba(147,51,234,0.5)]">
          Roadmaps
        </h1>

        <GradientText
          colors={["#8A2BE2", "#FF1493", "#FF00FF", "#9c40ff", "#8A2BE2"]}
          animationSpeed={7}
          showBorder={false}
          className="mt-3 text-sm w-2xl sm:text-base text-neutral-500 dark:text-neutral-400 mx-auto"
        >
          Structured learning paths built for developers — from first commit to
          production-ready. Pick a domain, choose your specialization, and track
          your progress with exams, coding challenges, real projects layer by
          layer.
        </GradientText>
      </motion.div>

      {/* Zone 1 — CategoryBar */}
      <CategoryBar />

      {/* Zone 2 — TrackSelector or idle prompt */}
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <TrackSelector key={selectedCategory.id} />
        ) : (
          <FloatingLoad />
        )}
      </AnimatePresence>

      {/* Zone 3 — RoadmapTree + LayerDetailPanel */}
    </div>
  );
}

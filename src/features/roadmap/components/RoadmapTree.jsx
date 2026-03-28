import { motion, AnimatePresence } from "framer-motion";
import { ROADMAPS } from "../../../../constants/roadmapPaths";
import useRoadmapStore from "@/stores/useRoadmapStore";
import LayerNode from "./LayerNode";
import LayerDetail from "./LayerDetail";

const RoadmapTree = () => {
  const { selectedTrack, isPanelOpen } = useRoadmapStore();
  const layers = ROADMAPS[selectedTrack?.id];

  if (!layers) {
    return (
      <motion.div
        className="mt-20 flex flex-col items-center gap-3 text-neutral-400 dark:text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-4xl">🚧</span>
        <p className="text-sm tracking-widest uppercase">Roadmap coming soon</p>
      </motion.div>
    );
  }

  return (
    <div className="relative mt-10 flex gap-6 items-start">
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-2xl mb-8 px-1">
          <p className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
            Selected Track
          </p>
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            {selectedTrack.title}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTrack.techs.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {layers.map((layer, index) => (
            <LayerNode key={layer.id} layer={layer} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Detail panel — slides in beside on desktop */}
      <AnimatePresence>{isPanelOpen && <LayerDetail />}</AnimatePresence>
    </div>
  );
};

export default RoadmapTree;

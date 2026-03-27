import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import useRoadmapStore from "@/stores/useRoadmapStore";

const LayerNode = ({ layer, index }) => {
  const { activeLayer, setActiveLayer } = useRoadmapStore();
  const isActive = activeLayer?.id === layer.id;

  return (
    <div className="flex justify-center items-center">
      <motion.button
        onClick={() => setActiveLayer(layer)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.06 }}
        className={`
        w-full flex items-center gap-4 px-4 py-4 rounded-2xl border text-left
        transition-all duration-200 cursor-pointer
        ${
          isActive
            ? "bg-violet-50 dark:bg-violet-900/20 border-violet-400 dark:border-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
            : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm"
        }
      `}
      >
        <div
          className={`
            shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
            transition-all duration-200
            ${
              isActive
                ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
            }
          `}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-sm sm:text-base truncate transition-colors duration-200
            ${isActive ? "text-violet-700 dark:text-violet-300" : "text-neutral-800 dark:text-neutral-100"}
            `}
          >
            {layer.title}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500">
              <Clock size={11} />
              {layer.estimatedTime}
            </span>
            <div className="flex flex-wrap gap-1">
              {layer.techs.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                >
                  {t}
                </span>
              ))}
              {layer.techs.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                  +{layer.techs.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className={`shrink-0 transition-all duration-200
            ${isActive ? "text-violet-500 translate-x-0.5" : "text-neutral-300 dark:text-neutral-600"}
          `}
        />
      </motion.button>
    </div>
  );
};

export default LayerNode;

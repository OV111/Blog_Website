import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GradientText from "@/components/effects/GradientText";
import { LIBRARY_TYPES } from "../../../constants/CodingLibs";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function CodingLibs() {
  return (
    <div className="min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none fixed -top-20 -left-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/20" />
      <div className="pointer-events-none fixed top-10 right-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/15" />

      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <GradientText
          colors={["#0d9488", "#6366f1", "#14b8a6", "#818cf8", "#0d9488"]}
          animationSpeed={7}
          showBorder={false}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
        >
          Coding Libraries
        </GradientText>
        <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto bg-gradient-to-r from-teal-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
          Everything you need to level up — books, docs, guides, and cheat
          sheets curated by the community.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {LIBRARY_TYPES.map((item) => (
          <motion.div key={item.slug} variants={cardVariants}>
            <Link
              to={`/coding-libs/${item.slug}`}
              className={`
                group flex flex-col gap-4 p-6 rounded-2xl
                bg-gradient-to-br ${item.gradient}
                border ${item.border}
                shadow-lg ${item.glow}
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                backdrop-blur-sm
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{item.icon}</span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${item.tag} bg-clip-text text-transparent border border-current/10`}
                >
                  {item.count}
                </span>
              </div>

              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                {item.label}
              </h2>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>

              <div
                className={`flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r ${item.tag} bg-clip-text text-transparent mt-auto`}
              >
                Explore
                <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

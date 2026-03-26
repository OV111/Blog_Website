import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";

export default function CodingChallenges() {
  return (
    <div className="min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none fixed -top-20 -left-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/20" />
      <div className="pointer-events-none fixed top-10 right-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/15" />

      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <GradientText
          colors={["#ea580c", "#9333ea", "#f97316", "#a855f7", "#ea580c"]}
          animationSpeed={7}
          showBorder={false}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
        >
          Coding Challenges
        </GradientText>
        <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Test your skills with timed challenges — solve real problems, compete
          with other devs, and level up your problem-solving one challenge at a
          time.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center mt-24 gap-3 text-neutral-400 dark:text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-5xl">⚡</span>
        <p className="text-sm tracking-wide">Challenges coming soon</p>
      </motion.div>
    </div>
  );
}

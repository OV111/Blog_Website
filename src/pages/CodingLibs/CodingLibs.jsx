import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";

export default function CodingLibs() {
  return (
    <div className="min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-12">
      {/* Background blobs */}
      <div className="pointer-events-none fixed -top-20 -left-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/20" />
      <div className="pointer-events-none fixed top-10 right-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/15" />

      <motion.div
        className="mb-10 text-center"
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
          A curated library of coding challenges — browse by topic, difficulty,
          or stack and sharpen your skills one problem at a time.
        </p>
      </motion.div>

      {/* Category Bar (path filter)                  │
│  All | Frontend | Backend | AI/ML | DevOps   │
│  Mobile | General                            │
├──────────────────────────────────────────────┤
│  Type Filter (second row of pills)           │
│  All | 📚 Books | 📖 Docs | 📝 Guides        │
│  🗒️ Cheat Sheets                             │
├──────────────────────────────────────────────┤
│  Search bar (by title or topic)              │
├──────────────────────────────────────────────┤
│  Resource Grid (2 cols desktop, 1 mobile)    │
│  ┌──────────┐  ┌──────────┐                 │
│  │  Card    │  │  Card    │                 │
│  └──────────┘  └──────── */}
      <motion.div
        className="flex flex-col items-center justify-center mt-24 gap-3 text-neutral-400 dark:text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-5xl">📚</span>
        <p className="text-sm tracking-wide">Libraries coming soon</p>
      </motion.div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function AchievementToast({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 rounded-lg bg-space-accent/90 px-4 py-3 text-sm text-white shadow-lg"
        >
          🏆 {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
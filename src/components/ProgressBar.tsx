'use client';

import { motion } from 'framer-motion';

const ProgressBar = ({ completedCount }: { completedCount: number }) => {
  const progressPercentage = (completedCount / 5) * 100;

  return (
    <motion.div className="w-full">
      <div className="w-full bg-[#1E2A45] rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-[#3B82F6] transition-all duration-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;

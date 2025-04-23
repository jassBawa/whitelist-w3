import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export interface TaskStatus {
  followed: boolean;
  liked: boolean;
  retweeted: boolean;
  discord: boolean;
  telegram: boolean;
}

interface TaskProps {
  icon: ReactNode;
  label: string;
  statusKey: keyof TaskStatus;
  onClick: () => void;
  status: boolean;
  isLoading: boolean;
}

const Task = ({
  icon,
  label,
  onClick,
  status,
  isLoading,
}: TaskProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[#1E2A45] rounded-xl p-4 flex items-center justify-between bg-transparent hover:border-blue-500/50 transition-all duration-300"
      layout
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-[#3B82F6]"
        >
          {icon}
        </motion.div>
        <span className="text-base text-white font-normal">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={isLoading || status}
          className={`px-4 py-1.5 text-[#3B82F6] rounded-lg transition-colors duration-300 text-sm ${
            status
              ? 'opacity-50 cursor-not-allowed'
              : isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#1E2A45]'
          }`}
          onClick={onClick}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Visit'}
        </motion.button>
        <motion.span
          initial={false}
          animate={{
            color: status ? 'rgb(74, 222, 128)' : 'rgb(156, 163, 175)',
          }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            status ? 'bg-[#15803D]/20 text-[#4ADE80]' : 'text-gray-400'
          }`}
        >
          {status ? 'Completed' : 'Pending'}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Task
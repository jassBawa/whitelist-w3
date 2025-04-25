'use client';
import { BenefitsIcon, CommunityIcon, EarlyAcessIcon } from '@/assets/icons';
import ConnectWallet from '@/components/Wallet';
import { motion } from 'framer-motion';

// Main Component
export default function WhitelistPage() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4 relative">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative z-10"
          >
            Join the Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto relative z-10"
          >
            Be among the first to experience our revolutionary platform. Connect
            your wallet to secure your spot in the future of decentralized
            innovation.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Card Background Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 mx-auto">
            <ConnectWallet />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
          {/* Feature Cards Background Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-30" />

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 flex flex-col items-center backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 relative z-10"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <EarlyAcessIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Early Access</h3>
            <p className="text-gray-400">
              Get priority access to new features and updates before anyone else
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 flex flex-col items-center backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 relative z-10"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <BenefitsIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Exclusive Benefits</h3>
            <p className="text-gray-400">
              Enjoy special rewards, incentives, and premium features
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 flex flex-col items-center backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 relative z-10"
          >
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
              <CommunityIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Access</h3>
            <p className="text-gray-400">
              Join our growing community of early adopters and innovators
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Address } from 'viem';

type JoinWhiteListProps = {
  address?: Address;
  alreadyRegistred: boolean;
  setAlreadyRegistred: (e: boolean) => void;
};

const JoinWhiteListButton: React.FC<JoinWhiteListProps> = ({
  address,
  alreadyRegistred,
  setAlreadyRegistred,
}) => {
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!address) {
      toast.error('Wallet address is missing.');
      return;
    }

    if (alreadyRegistred) {
      toast.success('You are already on the whitelist!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setAlreadyRegistred(true);
      toast.success(data.message || 'Successfully joined the whitelist!');
    } catch (error) {
      console.error('Waitlist error:', error);
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleJoin}
      whileTap={{ scale: 0.95 }}
      disabled={loading || !!alreadyRegistred}
      className={`w-1/2 px-4 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-medium text-base transition ${
        loading || alreadyRegistred
          ? 'opacity-70 cursor-not-allowed'
          : 'cursor-pointer'
      }`}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin mr-2 inline-block" />
      )}
      {alreadyRegistred ? 'You are already joined' : 'Join Whitelist'}
    </motion.button>
  );
};

export default JoinWhiteListButton;

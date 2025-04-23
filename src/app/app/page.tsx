'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import JoinWhiteListButton from '@/components/JoinWhiteListButton';
import { useAccount } from 'wagmi';
import ProgressBar from '@/components/ProgressBar';
import { TaskStatus } from '@/components/Task';
import Tasks from '@/components/Tasks';

function HomePage() {
  const [status, setStatus] = useState<TaskStatus>({
    followed: false,
    liked: false,
    retweeted: false,
    discord: false,
    telegram: false,
  });
  const [alreadyRegistred, setAlreadyRegistred] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const fetchUserStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/whitelist?walletAddress=${address}`);
      if (response.ok) {
        const data = await response.json();
        const { followed, liked, retweeted, discord, telegram, completedAt } =
          data;
        setAlreadyRegistred(completedAt ? true : false);
        setStatus({ followed, liked, retweeted, discord, telegram });
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
      toast.error('Failed to fetch your progress');
    }
  }, [address]);

  const updateTaskStatus = async (action: string) => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      router.push('/');
      return;
    }

    setIsLoading((prev) => ({ ...prev, [action]: true }));
    try {
      const response = await fetch(`/api/whitelist/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: address }),
      });

      if (response.ok) {
        const data = await response.json();
        const { followed, liked, retweeted, discord, telegram } = data;
        setStatus({ followed, liked, retweeted, discord, telegram });
        toast.success(
          `${action.charAt(0).toUpperCase() + action.slice(1)} successful!`
        );
      } else {
        throw new Error(`Failed to update ${action}`);
      }
    } catch (error) {
      toast.error(`Failed to update ${action}`);
      console.error('error: ', error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [action]: false }));
    }
  };

  const completedCount = Object.values(status).filter(Boolean).length;

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  return (
    <>
      <motion.div
        className="w-full space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Tasks
          updateTaskStatus={updateTaskStatus}
          isLoading={isLoading}
          status={status}
        />
      </motion.div>

      <motion.div
        className="mt-8 text-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            Progress: {completedCount}/5 Tasks Completed
          </p>
        </div>
        <ProgressBar completedCount={completedCount} />
        {completedCount === 5 && (
          <div className="mt-8">
            <JoinWhiteListButton
              address={address}
              alreadyRegistred={alreadyRegistred}
              setAlreadyRegistred={setAlreadyRegistred}
            />
          </div>
        )}
      </motion.div>
    </>
  );
}

export default HomePage;

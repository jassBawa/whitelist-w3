
import { SIGN_MESSAGE } from '@/constants';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useConnect, useSignMessage } from 'wagmi';

const ConnectWallet = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = async () => {
    try {
      if (!address) {
        toast.error('Wallet address not found.');
        return;
      }

      setIsLoading(true);

      const signedMessage = await signMessageAsync({
        message: SIGN_MESSAGE,
      });

      if (!signedMessage) {
        toast.error('Message signing failed.');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signedMessage, address }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server verification failed.');
      }

      const result = await response.json();

      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      toast.success('Wallet verified successfully!');
      router.push('/app');
    } catch (error) {
      console.error('Something went wrong:', error);
      toast.error('Something went wrong during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex gap-4"
        >
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="px-4 py-2 bg-[#1E2A45] hover:bg-[#2D3B56] text-[#3B82F6] rounded-lg text-sm font-medium flex items-center gap-2"
            >
              Connect using {connector.name}
            </button>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <p className="text-gray-400">
            Please sign the message to verify your wallet
          </p>
          <button
            onClick={handleSign}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto ${
              isLoading
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-[#1E2A45] hover:bg-[#2D3B56] text-[#3B82F6]'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Sign Message'}
          </button>
        </motion.div>
      )}
    </>
  );
};

export default ConnectWallet;

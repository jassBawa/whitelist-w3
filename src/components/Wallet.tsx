'use client';
import { SIGN_MESSAGE } from '@/constants';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { Wallet, ArrowRight, Loader2 } from 'lucide-react';

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

  // Helper function to get wallet icon based on connector name
  const getWalletIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'metamask':
      case 'injected':
        return (
          <div className=" bg-orange-500/20 p-2 rounded-md">
            <Wallet className="h-5 w-5 text-orange-500" />
          </div>
        );
      case 'coinbase wallet':
        return (
          <div className="bg-blue-500/20 p-2 rounded-md">
            <Wallet className="h-5 w-5 text-blue-500" />
          </div>
        );
      case 'walletconnect':
        return (
          <div className="bg-purple-500/20 p-2 rounded-md">
            <Wallet className="h-5 w-5 text-purple-500" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-500/20 p-2 rounded-md">
            <Wallet className="h-5 w-5 text-gray-500" />
          </div>
        );
    }
  };

  const isMobile =
    typeof window !== 'undefined' &&
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <div className="w-full mx-auto">
      <div className="bg-gradient-to-br from-[#1A2238] to-[#121827] p-6 rounded-xl border border-[#2D3B56]/30 shadow-lg">
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-[#3B82F6]/10 p-3 rounded-full">
            <Wallet className="h-6 w-6 text-[#3B82F6]" />
          </div>
        </div>

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-white text-center mb-4">
              Connect Your Wallet
            </h2>

            {connectors
              .filter((connector) => {
                // Skip injected connector on mobile devices
                if (isMobile && connector.id === 'injected') return false;
                return true;
              })
              .map((connector) => (
                <motion.button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-[#1E2A45] hover:bg-[#2D3B56] 
               border border-[#2D3B56]/70 rounded-xl text-white 
               font-medium flex items-center justify-between
               transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    {getWalletIcon(connector.name)}
                    <span className="text-[#3B82F6]">{connector.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}

            <p className="text-xs text-gray-400 text-center mt-4">
              By connecting, you agree to the terms of service
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-white">
                Verify Your Wallet
              </h2>
              <p className="text-gray-400">
                Please sign the message to verify your wallet
              </p>

              <div className="mt-2 py-2 px-4 bg-[#1E2A45]/70 rounded-lg inline-flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-300 font-medium">
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSign}
              disabled={isLoading}
              className={`w-full px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-600/50 text-gray-300 cursor-not-allowed border border-gray-700/30'
                  : 'bg-[#3B82F6] hover:bg-[#2D6FE0] text-white border border-[#3B82F6]/30'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign Message</span>
                </>
              )}
            </motion.button>

            {!isLoading && (
              <p className="text-xs text-gray-400 text-center">
                This request won&apos;t trigger a blockchain transaction or cost
                any gas fees
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;

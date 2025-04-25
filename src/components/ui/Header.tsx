"use client"
import useClickOutside from '@/hooks/useClickOutside';
import useIsMounted from '@/hooks/useIsMounted';
import { motion } from 'framer-motion';
import { ChevronDown, Copy, LoaderCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useDisconnect } from 'wagmi';

const formatAddress = (addr: string) => {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const isMounted = useIsMounted();
  const router = useRouter();

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard!');
    }
  };

  // Memoize the disconnect function to avoid unnecessary re-renders
  const handleDisconnect = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'GET', // Or 'POST' if you prefer
      });

      if (response.ok) {
        toast.success('Disconnected successfully');
        disconnect();
        router.push('/'); // Redirect after successful logout
      } else {
        console.error('Failed to disconnect');
        toast.error('Failed to disconnect');
      }
    } catch (err) {
      console.error('Error: ', err);
      toast.error('An error occurred while disconnecting');
    } finally {
      setIsOpen(false);

      setIsLoading(false);
    }
  }, [router, disconnect]);

  if (!isMounted) return null; // Prevent SSR mismatch

  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-20">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-6 h-6 bg-white mask mask-triangle" />
        <span className="text-lg text-white font-medium">Aiden</span>
      </Link>

      {isConnected && address && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-[#1E2A45] hover:bg-[#2D3B56] rounded-lg text-sm font-medium flex items-center gap-2 text-white"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="address-dropdown"
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            {formatAddress(address)}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-[#1E2A45] rounded-lg shadow-lg py-1 z-10"
              id="address-dropdown"
            >
              <button
                onClick={handleCopy}
                className="w-full px-4 py-2 text-sm text-white hover:bg-[#2D3B56] flex items-center gap-2"
                disabled={isLoading} // Disable while loading
              >
                <Copy className="w-4 h-4" />
                Copy Address
              </button>
              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-2 text-sm text-red-400 hover:bg-[#2D3B56] flex items-center gap-2"
                disabled={isLoading} // Disable while loading
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;

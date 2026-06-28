import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletNotConnected() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
      <p className="text-gray-600 mb-6">Please connect your wallet to view your tokens</p>
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
    </div>
  );
}

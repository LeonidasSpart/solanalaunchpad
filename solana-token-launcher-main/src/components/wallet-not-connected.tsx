import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletNotConnected() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-2xl font-bold mb-4 text-white">Wallet Not Connected</h2>
      <p className="text-[#BDDBDB] mb-6">Please connect your wallet to view your tokens</p>
      <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !text-white" />
    </div>
  );
}

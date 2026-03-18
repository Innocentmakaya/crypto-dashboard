import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useTopCoins } from '../hooks/useTopCoins';
import CoinCard from '../components/CoinCard';

const Dashboard = () => {
  const { coins, loading, error } = useTopCoins();
  const currency = useSelector((state: RootState) => state.crypto.currency);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-gray-400 text-sm mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Crypto <span className="text-blue-400">Market</span>
        </h1>
        <p className="text-gray-400 mt-1">
          Top 10 cryptocurrencies by market capitalisation
        </p>
      </div>

      {/* Table Header */}
      <div className="flex items-center gap-4 px-4 mb-2 text-gray-500 text-xs uppercase tracking-wider">
        <span className="w-6">#</span>
        <span className="w-10" />
        <span className="flex-1">Name</span>
        <span className="hidden sm:block w-32 text-right">Price / 24h</span>
        <span className="hidden md:block w-32 text-right">Market Cap</span>
        <span className="w-4" />
      </div>

      {/* Coin List */}
      <div className="flex flex-col gap-3">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} currency={currency} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
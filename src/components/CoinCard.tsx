import { useNavigate } from 'react-router-dom';
import type { Coin, Currency } from '../types/crypto';
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters';

interface CoinCardProps {
  coin: Coin;
  currency: Currency;
}

const CoinCard = ({ coin, currency }: CoinCardProps) => {
  const navigate = useNavigate();
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div
      onClick={() => navigate(`/coin/${coin.id}`)}
      className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-500 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 group"
    >
      {/* Rank */}
      <span className="text-gray-500 text-sm w-6 text-center">
        {coin.market_cap_rank}
      </span>

      {/* Icon + Name */}
      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold group-hover:text-blue-400 transition-colors truncate">
          {coin.name}
        </p>
        <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
      </div>

      {/* Price */}
      <div className="text-right hidden sm:block">
        <p className="text-white font-medium">
          {formatPrice(coin.current_price, currency)}
        </p>
        <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {formatPercentage(coin.price_change_percentage_24h)}
        </p>
      </div>

      {/* Market Cap */}
      <div className="text-right hidden md:block min-w-[120px]">
        <p className="text-gray-400 text-xs mb-1">Market Cap</p>
        <p className="text-white text-sm">
          {formatMarketCap(coin.market_cap, currency)}
        </p>
      </div>

      {/* Arrow */}
      <span className="text-gray-600 group-hover:text-blue-400 transition-colors">›</span>
    </div>
  );
};

export default CoinCard;
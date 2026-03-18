import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { fetchHistoricalData } from '../api/coinGecko';
import StatCard from '../components/StatCard';
import PriceChart from '../components/PriceChart';
import type { HistoricalDataPoint, TimeRange } from '../types/crypto';
import { formatPrice, formatMarketCap, formatPercentage, formatSupply } from '../utils/formatters';

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currency = useSelector((state: RootState) => state.crypto.currency);
  const { coin, loading, error } = useCoinDetail(id!);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('7');
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadChart = async () => {
      setChartLoading(true);
      try {
        const data = await fetchHistoricalData(id, currency, timeRange);
        setHistoricalData(data);
      } catch {
        console.error('Failed to load chart data');
      } finally {
        setChartLoading(false);
      }
    };
    loadChart();
  }, [id, currency, timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">{error ?? 'Coin not found'}</p>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-400 hover:underline text-sm">
            {'← Back to Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
        {'← Back to Dashboard'}
      </button>

      <div className="flex items-center gap-4 mb-8">
        <img src={coin.image} alt={coin.name} className="w-16 h-16 rounded-full" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{coin.name}</h1>
            <span className="text-gray-400 uppercase text-lg">{coin.symbol}</span>
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{`Rank #${coin.market_cap_rank}`}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-2xl font-semibold text-white">{formatPrice(coin.current_price, currency)}</span>
            <span className={`font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(coin.price_change_percentage_24h)}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-white font-semibold text-lg mb-3">Price Chart</h2>
        {chartLoading ? (
          <div className="bg-gray-800 rounded-xl h-[360px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <PriceChart data={historicalData} currency={currency} timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Market Cap" value={formatMarketCap(coin.market_cap, currency)} />
        <StatCard label="24h Volume" value={formatMarketCap(coin.total_volume, currency)} />
        <StatCard label="All Time High" value={formatPrice(coin.ath, currency)} />
        <StatCard label="All Time Low" value={formatPrice(coin.atl, currency)} />
        <StatCard label="Circulating Supply" value={formatSupply(coin.circulating_supply)} subValue={coin.symbol.toUpperCase()} positive={null} />
        <StatCard label="Max Supply" value={formatSupply(coin.max_supply)} subValue={coin.symbol.toUpperCase()} positive={null} />
      </div>

      {coin.sentiment_votes_up_percentage && (
        <div className="bg-gray-800 rounded-xl p-4 mb-8">
          <h2 className="text-white font-semibold mb-3">Community Sentiment</h2>
          <div className="flex rounded-full overflow-hidden h-4">
            <div className="bg-green-400 transition-all" style={{ width: `${coin.sentiment_votes_up_percentage}%` }} />
            <div className="bg-red-400 transition-all" style={{ width: `${coin.sentiment_votes_down_percentage}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-green-400">{`👍 ${coin.sentiment_votes_up_percentage?.toFixed(1)}%`}</span>
            <span className="text-red-400">{`👎 ${coin.sentiment_votes_down_percentage?.toFixed(1)}%`}</span>
          </div>
        </div>
      )}

      {coin.description && (
        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-white font-semibold mb-3">{`About ${coin.name}`}</h2>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-6" dangerouslySetInnerHTML={{ __html: coin.description }} />
          {coin.homepage && (
            <a href={coin.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm mt-3 inline-block">
              {'Official Website →'}
            </a>
          )}
        </div>
      )}

    </div>
  );
};

export default CoinDetail;
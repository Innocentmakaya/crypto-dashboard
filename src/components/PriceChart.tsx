import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { HistoricalDataPoint, Currency, TimeRange } from '../types/crypto';
import { formatPrice } from '../utils/formatters';

interface PriceChartProps {
  data: HistoricalDataPoint[];
  currency: Currency;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '1', label: '24H' },
  { value: '7', label: '7D' },
  { value: '30', label: '1M' },
  { value: '365', label: '1Y' },
];

const formatDate = (timestamp: number, timeRange: TimeRange): string => {
  const date = new Date(timestamp);
  if (timeRange === '1') {
    return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
};

const PriceChart = ({ data, currency, timeRange, onTimeRangeChange }: PriceChartProps) => {
  const isPositive =
    data.length > 1 && data[data.length - 1].price >= data[0].price;

  const chartColor = isPositive ? '#34d399' : '#f87171';

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      {/* Time Range Selector */}
      <div className="flex justify-end gap-1 mb-4">
        {TIME_RANGES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTimeRangeChange(value)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === value
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(val) => formatDate(val, timeRange)}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={(val) => formatPrice(val, currency)}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={90}
          />

          <Tooltip
         contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
         labelStyle={{ color: '#9ca3af', fontSize: 12 }}
         formatter={(val) => [formatPrice(Number(val), currency), 'Price']}
         labelFormatter={(label) => formatDate(label, timeRange)}
        />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={2}
            fill="url(#colorPrice)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
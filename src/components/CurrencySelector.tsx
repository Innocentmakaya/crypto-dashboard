import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { setCurrency } from '../store/slices/cryptoSlice';
import type { Currency } from '../types/crypto';

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'zar', label: 'ZAR' },
  { value: 'usd', label: 'USD' },
  { value: 'btc', label: 'BTC' },
];

const CurrencySelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currency = useSelector((state: RootState) => state.crypto.currency);

  return (
    <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
      {CURRENCIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => dispatch(setCurrency(value))}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currency === value
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CurrencySelector;
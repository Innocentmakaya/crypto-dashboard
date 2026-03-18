import { Link } from 'react-router-dom';
import CurrencySelector from './CurrencySelector';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">₿</span>
        <span className="text-white font-bold text-xl tracking-tight">
          Crypto<span className="text-blue-400">Track</span>
        </span>
      </Link>
      <CurrencySelector />
    </nav>
  );
};

export default Navbar;
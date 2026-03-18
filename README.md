# CryptoTrack 📈

A live cryptocurrency tracking dashboard built with React and TypeScript, using the CoinGecko API.

## Features

- 📊 Live top 10 cryptocurrencies by market capitalisation
- 💱 Currency switcher — view prices in ZAR, USD or BTC
- 📈 Historical price charts with 24H, 7D, 1M and 1Y granularity
- 🔍 Detailed coin page with market stats, sentiment and description
- ⚡ Redux caching to minimise unnecessary API calls
- 📱 Responsive design for desktop, tablet and mobile

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Recharts
- Tailwind CSS
- Axios
- CoinGecko API

## Getting Started

### Prerequisites
- Node.js v18 or higher
- A free CoinGecko API key from [https://www.coingecko.com/en/api](https://www.coingecko.com/en/api)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/Innocentmakaya/crypto-dashboard.git
   cd crypto-dashboard
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the root of the project:
```
   VITE_COINGECKO_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
   npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```
src/
├── api/              # CoinGecko API calls
├── store/            # Redux store and slices
│   └── slices/       # cryptoSlice and detailSlice
├── hooks/            # Custom React hooks
├── pages/            # Dashboard and CoinDetail pages
├── components/       # Reusable UI components
├── types/            # TypeScript interfaces
└── utils/            # Formatting helper functions
```

## Note on API Rate Limits

This project uses the CoinGecko free demo API key which has a limit of 30 requests per minute. If you see a fetch error, simply wait a moment and refresh the page. This would not be an issue with a paid API key.
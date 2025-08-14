# Stock Market Dashboard

A modern, responsive React-based stock market dashboard built with TypeScript, TailwindCSS, and Recharts.

## Features

- **Clean Modern Design**: Professional financial interface with dark theme
- **Responsive Layout**: Mobile-first design with collapsible sidebar
- **Interactive Charts**: Beautiful line charts showing stock price trends
- **Company Search**: Real-time search through company listings
- **Stock Metrics**: 52-week high/low, average volume, and price changes
- **Loading States**: Smooth loading animations and error handling
- **Real-time Updates**: Toast notifications for user actions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS with custom design system
- **Charts**: Recharts for data visualization
- **UI Components**: Radix UI primitives with custom variants
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks (useState, useEffect)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # App header with navigation
│   ├── Sidebar.tsx      # Company list and search
│   ├── StockChart.tsx   # Interactive price charts
│   └── CompanyInfo.tsx  # Stock metrics display
├── data/                # Mock data for testing
│   ├── companies.json   # Company listings
│   └── sampleStockData.json # Historical stock data
├── services/            # API service layer
│   └── stockService.ts  # Data fetching logic
└── pages/
    └── Index.tsx        # Main dashboard page
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Backend Integration

The frontend is designed to connect to a TypeScript backend with these endpoints:

### API Endpoints

- `GET /api/companies` - Returns array of `{ name, symbol }`
- `GET /api/stocks/:symbol` - Returns `{ data: [{ date, price }], info: { weekHigh52, weekLow52, avgVolume } }`

### Example Backend Response

```typescript
// GET /api/companies
[
  { "name": "Apple Inc.", "symbol": "AAPL" },
  { "name": "Microsoft Corporation", "symbol": "MSFT" }
]

// GET /api/stocks/AAPL
{
  "data": [
    { "date": "2024-08-01", "price": 189.50 },
    { "date": "2024-08-02", "price": 192.75 }
  ],
  "info": {
    "weekHigh52": 210.50,
    "weekLow52": 165.75,
    "avgVolume": 52800000
  }
}
```

## Mock Data

For development and testing, the app includes mock data:

- **companies.json**: 12 major tech companies
- **sampleStockData.json**: Historical price data for Apple, Microsoft, Google, and Tesla

## Customization

### Design System

The app uses a comprehensive design system defined in:
- `src/index.css` - CSS custom properties and utility classes
- `tailwind.config.ts` - TailwindCSS configuration

### Adding New Companies

Add entries to `src/data/companies.json`:

```json
{
  "name": "Company Name",
  "symbol": "TICKER"
}
```

### Backend Connection

To connect to a real backend, update `src/services/stockService.ts`:

```typescript
// Uncomment and modify the API methods
async getStockDataFromAPI(symbol: string): Promise<StockResponse> {
  const response = await fetch(`/api/stocks/${symbol}`);
  return response.json();
}
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.
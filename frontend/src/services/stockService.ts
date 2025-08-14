// Mock service that simulates backend API calls
import companiesData from '@/data/companies.json';
import stockData from '@/data/sampleStockData.json';

export interface Company {
  name: string;
  symbol: string;
}

export interface StockDataPoint {
  date: string;
  price: number;
}

export interface StockInfo {
  weekHigh52: number;
  weekLow52: number;
  avgVolume: number;
}

export interface StockResponse {
  data: StockDataPoint[];
  info: StockInfo;
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const stockService = {
  // async getCompanies(): Promise<Company[]> {
  //   await delay(500); // Simulate API delay
  //   return companiesData;
  // },
  //
  // async getStockData(symbol: string): Promise<StockResponse> {
  //   await delay(800); // Simulate API delay
  //
  //   const stockInfo = (stockData as any)[symbol];
  //
  //   if (!stockInfo) {
  //     throw new Error(`Stock data not found for symbol: ${symbol}`);
  //   }
  //
  //   // In a real implementation, this would make an actual HTTP request:
  //   // const response = await fetch(`/api/stocks/${symbol}`);
  //   // if (!response.ok) throw new Error('Failed to fetch stock data');
  //   // return response.json();
  //
  //   return stockInfo;
  // },

  // Method to simulate real API call (commented out for now)

  async getStockDataFromAPI(symbol: string): Promise<StockResponse> {
    try {
      console.log(`Fetching stock data for symbol: ${symbol}`);
      const response = await fetch(`http://localhost:3000/stockDetails?symbol=${symbol}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch stock data: ${error.message}`);
      }
      throw new Error('Failed to fetch stock data');
    }
  },

  async getCompaniesFromAPI(): Promise<Company[]> {
    try {
      const response = await fetch('http://localhost:3000/companies');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch companies: ${error.message}`);
      }
      throw new Error('Failed to fetch companies');
    }
  }
};

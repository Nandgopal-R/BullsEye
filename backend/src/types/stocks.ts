export interface StockDataPoint {
  date: string; // YYYY-MM-DD
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

export interface CompanyDTO {
  name: string;
  symbol: string;
}

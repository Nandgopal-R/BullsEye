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
export interface CompanyDTO {
    name: string;
    symbol: string;
}
//# sourceMappingURL=stocks.d.ts.map
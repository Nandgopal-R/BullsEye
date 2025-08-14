import yahooFinance from "yahoo-finance2";
import { StockResponse, StockDataPoint, StockInfo, CompanyDTO } from "../types/stocks.ts";

export async function fetchStockData(
  symbol: string,
  historyDays: number = 365
): Promise<{ company: CompanyDTO; stockData: StockResponse }> {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - historyDays);

  const [quote, historical] = await Promise.all([
    yahooFinance.quote(symbol),
    yahooFinance.historical(symbol, {
      period1: start,
      period2: now,
      interval: "1d"
    })
  ]);

  const company: CompanyDTO = {
    symbol: quote.symbol ?? symbol,
    name: quote.longName ?? quote.shortName ?? symbol
  };

  const data: StockDataPoint[] = (historical || [])
    .filter(item => item.date && item.close != null)
    .map(item => ({
      date: item.date!.toISOString().split("T")[0],
      price: Number(item.close)
    }));

  if (data.length === 0 && quote.regularMarketPrice != null) {
    data.push({
      date: now.toISOString().split("T")[0],
      price: Number(quote.regularMarketPrice)
    });
  }

  const info: StockInfo = {
    weekHigh52: Number(quote.fiftyTwoWeekHigh ?? 0),
    weekLow52: Number(quote.fiftyTwoWeekLow ?? 0),
    avgVolume: Number(quote.averageDailyVolume3Month ?? 0)
  };

  return { company, stockData: { data, info } };
}

import { Request, Response } from "express";
import { fetchStockData } from "../services/yahoo.service.ts";

export async function getStockDetailsController(req: Request, res: Response) {
  try {
    const symbol = req.query.symbol as string; // Get the symbol from query params
    if (!symbol) {
      return res.status(400).json({ error: "Symbol query parameter is required" });
    }

    const { stockData } = await fetchStockData(symbol);

    // Return only the stockData object (matches frontend expectation)
    res.json(stockData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}

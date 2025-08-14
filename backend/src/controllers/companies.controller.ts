import { Request, Response } from "express";
import { fetchStockData } from "../services/yahoo.service.ts";

export async function getCompaniesController(req: Request, res: Response) {
  try {
    const symbols = ["AAPL", "MSFT", "GOOG"]; // Example static symbols
    const results = await Promise.all(symbols.map(s => fetchStockData(s)));
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}

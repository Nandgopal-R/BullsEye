import { fetchStockResponse } from "../services/yahoo.service";
import { prisma } from "../services/prisma";
export async function getStockBySymbolController(req, res) {
    try {
        const { symbol } = req.params;
        if (!symbol)
            return res.status(400).json({ error: "symbol is required" });
        const days = Number(process.env.HISTORY_DAYS || 365);
        const payload = await fetchStockResponse(symbol, days);
        // Optional: ensure the company exists in DB (without hardcoding)
        await prisma.company.upsert({
            where: { symbol },
            update: { updatedAt: new Date() },
            create: { symbol, name: symbol }
        });
        res.json(payload);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || "Failed to fetch stock data" });
    }
}
//# sourceMappingURL=stocks.controller.js.map
import yahooFinance from "yahoo-finance2";
function fmt(d) {
    return d.toISOString().split("T")[0];
}
export async function fetchStockResponse(symbol, historyDays = 365) {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - (historyDays || 365));
    // Historical prices
    const historical = await yahooFinance.historical(symbol, {
        period1: start,
        period2: now,
        interval: "1d"
    });
    const data = historical.map(h => ({
        date: fmt(new Date(h.date)),
        price: h.close
    }));
    if (data.length === 0) {
        // fallback: at least one point if API returns empty
        const q = await yahooFinance.quote(symbol);
        data.push({ date: fmt(now), price: Number(q.regularMarketPrice || 0) });
    }
    // Quote for 52w metrics and volume
    const quote = await yahooFinance.quote(symbol);
    const info = {
        weekHigh52: Number(quote.fiftyTwoWeekHigh || 0),
        weekLow52: Number(quote.fiftyTwoWeekLow || 0),
        avgVolume: Number(quote.averageDailyVolume3Month || 0)
    };
    return { data, info };
}
//# sourceMappingURL=yahoo.service.js.map
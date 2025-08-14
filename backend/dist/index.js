import "dotenv/config";
import express from "express";
import cors from "cors";
import companiesRoutes from "./routes/companies.routes";
import stocksRoutes from "./routes/stocks.routes";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/companies", companiesRoutes);
app.use("/api/stocks", stocksRoutes);
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
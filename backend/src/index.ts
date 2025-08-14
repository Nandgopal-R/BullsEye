import express from "express";
import cors from "cors";
import stockDetailsRouter from "./routes/stockDetails.ts";
import companyRouter from "./routes/company.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/stockDetails", stockDetailsRouter);
app.use("/companies", companyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

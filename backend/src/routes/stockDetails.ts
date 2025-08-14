import { Router } from "express";
import { getStockDetailsController } from "../controllers/stockDetails.ts";

const router = Router();

// Endpoint now expects a query parameter: ?symbol=AAPL
router.get("/", getStockDetailsController);

export default router;

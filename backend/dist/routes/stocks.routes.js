import { Router } from "express";
import { getStockBySymbolController } from "../controllers/stocks.controller";
const router = Router();
router.get("/:symbol", getStockBySymbolController);
export default router;
//# sourceMappingURL=stocks.routes.js.map
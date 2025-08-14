import { Router } from "express";
import { getCompaniesController } from "../controllers/companies.controller";
const router = Router();
router.get("/", getCompaniesController);
export default router;
//# sourceMappingURL=companies.routes.js.map
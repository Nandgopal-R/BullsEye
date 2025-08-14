import { Router } from "express";
import { getCompaniesController } from "../controllers/companies.controller.ts";

const router = Router();
router.get("/", getCompaniesController);
export default router;

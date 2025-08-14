import { Router } from "express";
import { getCompanies } from "../controllers/companies.ts";

const router = Router();

router.get("/", getCompanies);

export default router;

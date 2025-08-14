import { getAllCompaniesOrdered } from "../services/company.service";
export async function getCompaniesController(_req, res) {
    try {
        const companies = await getAllCompaniesOrdered();
        res.json(companies);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || "Failed to fetch companies" });
    }
}
//# sourceMappingURL=companies.controller.js.map
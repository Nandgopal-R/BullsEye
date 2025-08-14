import { prisma } from "./prisma";
// * Returns all companies from DB in the chosen order.
export async function getAllCompaniesOrdered() {
    const list = await prisma.company.findMany({
        orderBy: [{ order: "asc" }, { name: "asc" }],
        select: { name: true, symbol: true }
    });
    return list;
}
//# sourceMappingURL=company.service.js.map
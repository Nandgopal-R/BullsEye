import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany(
      {
        select: {
          name: true,
          symbol: true,
        }
      }
    );
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

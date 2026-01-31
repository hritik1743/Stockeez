import express from "express";
import { fetchStockData } from "../services/stockService.js";
import companies from "../data/nseCompanies.js";

const router = express.Router();

/* ✅ 1. LIST ALL COMPANIES (SEARCH, SECTOR, COMPARE) */
router.get("/", (req, res) => {
  res.json(companies);
});

/* ✅ 2. TOP PICKS (TOP PICKS PAGE) */
router.get("/top-picks/:sector", async (req, res) => {
  try {
    const sector = req.params.sector;
    const filtered =
      sector === "ALL"
        ? companies
        : companies.filter((c) => c.sector === sector);

    // simple demo ranking (stable)
    const picks = filtered.slice(0, 5).map((c) => ({
      symbol: c.symbol,
      name: c.name,
      sector: c.sector,
      score: Math.floor(Math.random() * 3) + 6,
      verdict: "BUY",
    }));

    res.json(picks);
  } catch (e) {
    res.status(500).json({ error: "Top picks failed" });
  }
});

/* ✅ 3. STOCK DETAILS (STOCK PAGE + COMPARE) */
router.get("/:symbol", async (req, res) => {
  try {
    const data = await fetchStockData(req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Stock fetch failed" });
  }
});

export default router;

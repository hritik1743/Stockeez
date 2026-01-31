import companies from "../data/nseCompanies.js";
import { fetchStockData } from "./stockService.js";

const scoreStock = (data) => {
  let score = 0;

  // Fundamentals (max 4)
  if (data.fundamentals.roe > 15) score++;
  if (data.fundamentals.roce > 15) score++;
  if (data.fundamentals.debt < 0.5) score++;
  if (data.fundamentals.revenueGrowth > 10) score++;

  // Technicals (max 3)
  if (data.technicals.rsi >= 40 && data.technicals.rsi <= 60) score++;
  if (data.technicals.macd === "Bullish") score++;
  if (data.technicals.trend === "Uptrend") score++;

  return score;
};

export const getTopPicks = async (sector) => {
  const filtered = companies.filter(
    (c) => sector === "ALL" || c.sector === sector
  );

  const results = [];

  for (const company of filtered.slice(0, 10)) {
    try {
      const data = await fetchStockData(company.symbol);
      const score = scoreStock(data);

      results.push({
        symbol: company.symbol,
        name: company.name,
        sector: company.sector,
        score,
        verdict:
          score >= 6 ? "BUY" : score >= 4 ? "HOLD" : "AVOID"
      });
    } catch {
      continue;
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
};

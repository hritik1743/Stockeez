import { fetchStockData } from "../services/stockService.js";

export const getStockAnalysis = async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const data = await fetchStockData(symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
};

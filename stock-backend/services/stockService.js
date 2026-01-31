import axios from "axios";

// --- RSI CALCULATION ---
function calculateRSI(prices, period = 14) {
  let gains = 0;
  let losses = 0;

  for (let i = prices.length - period; i < prices.length - 1; i++) {
    const diff = prices[i + 1] - prices[i];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }

  if (losses === 0) return 100;

  const rs = gains / losses;
  return Math.round(100 - 100 / (1 + rs));
}

// --- MACD CALCULATION ---
function calculateEMA(prices, period) {
  const k = 2 / (period + 1);
  let ema = prices[0];

  prices.forEach((price) => {
    ema = price * k + ema * (1 - k);
  });

  return ema;
}

function calculateMACD(prices) {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  return Number((ema12 - ema26).toFixed(2));
}

// --- MAIN FETCH ---
export const fetchStockData = async (symbol) => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS?range=1mo&interval=1d`;

  const res = await axios.get(url);
  
  const result = res.data.chart.result?.[0];
  console.error(result)
  if (!result) {
    throw new Error("Invalid Yahoo Finance response");
  }

  const prices = result.indicators.quote[0].close.filter(Boolean);
  const timestamps = result.timestamp;

  const rsi = calculateRSI(prices);
  const macdValue = calculateMACD(prices);

  const chartData = prices.map((price, i) => ({
    date: new Date(timestamps[i] * 1000).toLocaleDateString(),
    price,
    rsi,
    macd: macdValue,
  }));

  return {
    symbol,
    fundamentals: {
      roe: 22,
      roce: 18,
      pe: 17,
      debt: 0.2,
      revenueGrowth: 12,
      epsGrowth: 15,
      score: 8,
    },
    technicals: {
      rsi,
      macd: macdValue > 0 ? "Bullish" : "Bearish",
      trend: rsi > 50 ? "Uptrend" : "Downtrend",
      support: "₹3200",
      resistance: "₹3500",
    },
    chartData,
    aiDecision: {
      action:
        rsi < 35 ? "BUY" : rsi > 70 ? "AVOID" : "HOLD",
      confidence: rsi < 35 || rsi > 70 ? 80 : 60,
    },
  };
};

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StockDetails() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${url}/stocks/${symbol}`)
      .then(res => setData(res.data));
  }, [symbol]);

  const addToWatchlist = () => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (stored.some(s => s.symbol === symbol)) return alert("Already added");
    stored.push({ symbol, name: symbol });
    localStorage.setItem("watchlist", JSON.stringify(stored));
    alert("Added to Watchlist");
  };

  if (!data) return <div className="text-gray-400 p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{symbol}</h1>
        <span
          className={`px-4 py-1 rounded-full ${
            data.aiDecision.action === "BUY"
              ? "bg-green-600"
              : data.aiDecision.action === "HOLD"
              ? "bg-yellow-500"
              : "bg-red-600"
          }`}
        >
          {data.aiDecision.action}
        </span>
      </div>

      <button
        onClick={addToWatchlist}
        className="mb-6 bg-blue-600 px-4 py-2 rounded"
      >
        Add to Watchlist
      </button>

      <div className="bg-slate-900 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Fundamentals</h2>
        <p>ROE: {data.fundamentals.roe}%</p>
        <p>ROCE: {data.fundamentals.roce}%</p>
        <p>P/E: {data.fundamentals.pe}</p>
      </div>

      <div className="bg-slate-900 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Technicals</h2>
        <p>RSI: {data.technicals.rsi}</p>
        <p>MACD: {data.technicals.macd}</p>
        <p>Trend: {data.technicals.trend}</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

export default function Compare() {
  const [companies, setCompanies] = useState([]);
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [leftData, setLeftData] = useState(null);
  const [rightData, setRightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all NSE companies
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stocks")
      .then((res) => setCompanies(res.data))
      .catch(() => setError("Failed to load companies"));
  }, []);

  const compareStocks = async () => {
    if (!left || !right) return;

    setLoading(true);
    setError("");
    setLeftData(null);
    setRightData(null);

    try {
      const [a, b] = await Promise.all([
        axios.get(`http://localhost:5000/api/stocks/${left}`),
        axios.get(`http://localhost:5000/api/stocks/${right}`)
      ]);

      setLeftData(a.data);
      setRightData(b.data);
    } catch {
      setError("Failed to compare stocks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">Compare Stocks</h1>
      <p className="text-gray-400 mb-6">
        Select two NSE companies to compare fundamentals and technical indicators.
      </p>

      {/* Select dropdowns */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <select
          className="bg-slate-800 p-3 rounded"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        >
          <option value="">Select Company A</option>
          {companies.map((c) => (
            <option key={c.symbol} value={c.symbol}>
              {c.name} ({c.symbol})
            </option>
          ))}
        </select>

        <select
          className="bg-slate-800 p-3 rounded"
          value={right}
          onChange={(e) => setRight(e.target.value)}
        >
          <option value="">Select Company B</option>
          {companies.map((c) => (
            <option key={c.symbol} value={c.symbol}>
              {c.name} ({c.symbol})
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-green-600 px-6 py-2 rounded disabled:opacity-50"
        disabled={!left || !right || loading}
        onClick={compareStocks}
      >
        {loading ? "Comparing..." : "Compare"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* Comparison result */}
      {leftData && rightData && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[leftData, rightData].map((d) => (
            <div key={d.symbol} className="bg-slate-900 p-5 rounded">
              <h2 className="text-xl font-bold mb-4">{d.symbol}</h2>

              <h3 className="text-green-400 font-semibold mb-2">Fundamentals</h3>
              <p>ROE: {d.fundamentals.roe}%</p>
              <p>ROCE: {d.fundamentals.roce}%</p>
              <p>P/E: {d.fundamentals.pe}</p>
              <p>Debt: {d.fundamentals.debt}</p>
              <p>Revenue Growth: {d.fundamentals.revenueGrowth}%</p>
              <p>EPS Growth: {d.fundamentals.epsGrowth}%</p>

              <hr className="my-3 border-slate-700" />

              <h3 className="text-blue-400 font-semibold mb-2">
                Technical Indicators
              </h3>
              <p>RSI: {d.technicals.rsi}</p>
              <p>MACD: {d.technicals.macd}</p>
              <p>Trend: {d.technicals.trend}</p>
              <p>Support: {d.technicals.support}</p>
              <p>Resistance: {d.technicals.resistance}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

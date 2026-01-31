import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TopPicks() {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${url}/stocks/top-picks/ALL`)
      .then(res => setStocks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Top Picks</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {stocks.map(s => (
          <div
            key={s.symbol}
            onClick={() => navigate(`/stock/${s.symbol}`)}
            className="bg-slate-900 p-5 rounded-xl cursor-pointer hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold">{s.name}</h2>
            <p className="text-gray-400">{s.symbol}</p>

            <span className="inline-block mt-3 px-3 py-1 rounded bg-green-600">
              BUY
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

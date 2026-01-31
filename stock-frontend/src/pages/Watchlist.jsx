import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  const removeStock = (symbol) => {
    const updated = watchlist.filter((s) => s.symbol !== symbol);
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setWatchlist(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">No stocks added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className="bg-slate-900 p-4 rounded flex justify-between items-center"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/stock/${stock.symbol}`)}
              >
                <div className="font-semibold">{stock.name}</div>
                <div className="text-sm text-gray-400">
                  {stock.symbol}
                </div>
              </div>

              <button
                className="text-red-400"
                onClick={() => removeStock(stock.symbol)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

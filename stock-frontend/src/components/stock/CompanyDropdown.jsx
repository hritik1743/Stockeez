import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CompanyDropdown() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sector, setSector] = useState("ALL");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stocks")
      .then((res) => {
        setCompanies(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let data = companies;

    if (sector !== "ALL") {
      data = data.filter((c) => c.sector === sector);
    }

    if (search.trim()) {
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data.slice(0, 8));
  }, [sector, search, companies]);

  const sectors = ["ALL", ...new Set(companies.map((c) => c.sector))];

  return (
    <div className="relative w-full max-w-xl">
      {/* Sector Dropdown */}
      <select
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-slate-800 text-white"
      >
        {sectors.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search NSE company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded bg-slate-900 text-white"
      />

      {/* Suggestions */}
      {search && (
        <div className="absolute w-full bg-slate-800 mt-1 rounded z-10">
          {filtered.length === 0 && (
            <div className="p-2 text-gray-400">No results</div>
          )}

          {filtered.map((c) => (
            <div
              key={c.symbol}
              onClick={() => navigate(`/stock/${c.symbol}`)}
              className="p-2 hover:bg-slate-700 cursor-pointer"
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-400">
                {c.symbol} • {c.sector}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

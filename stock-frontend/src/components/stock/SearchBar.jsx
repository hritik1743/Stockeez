import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sector, setSector] = useState("ALL");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/stocks")
      .then(res => setCompanies(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let data = companies;

    if (sector !== "ALL") {
      data = data.filter(c => c.sector === sector);
    }

    if (search.trim()) {
      data = data.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data.slice(0, 8));
  }, [search, sector, companies]);

  const sectors = ["ALL", ...new Set(companies.map(c => c.sector))];

  return (
    <div className="relative">
      <select
        className="w-full p-3 mb-2 rounded bg-slate-800 text-white"
        value={sector}
        onChange={e => setSector(e.target.value)}
      >
        {sectors.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search NSE company..."
        className="w-full p-3 rounded bg-slate-950 text-white"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {search && (
        <div className="absolute w-full bg-slate-800 mt-1 rounded z-10">
          {filtered.map(c => (
            <div
              key={c.symbol}
              className="p-3 hover:bg-slate-700 cursor-pointer"
              onClick={() => navigate(`/stock/${c.symbol}`)}
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

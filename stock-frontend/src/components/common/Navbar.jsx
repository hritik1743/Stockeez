import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex gap-6">
      <Link to="/" className="font-bold text-green-400">Stockeez</Link>
      <Link to="/">Home</Link>
      <Link to="/top-picks">Top Picks</Link>
      <Link to="/compare">Compare</Link>
      <Link to="/watchlist">Watchlist</Link>
    </nav>
  );
}

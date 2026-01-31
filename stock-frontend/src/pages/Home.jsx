import SearchBar from "../components/stock/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">
          Smart Stock Analyzer
        </h1>
        <p className="text-gray-400 mb-6">
          Search NSE stocks by sector & symbol
        </p>
        <SearchBar />
      </div>
    </div>
  );
}

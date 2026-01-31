export default function TechnicalsCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-blue-400">
        Technical Indicators
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Metric label="RSI" value={data.rsi} status={rsiStatus(data.rsi)} />
        <Metric label="MACD" value={data.macd} status={data.macd} />
        <Metric label="Trend" value={data.trend} status={data.trend} />
        <Metric label="Support" value={data.support} />
        <Metric label="Resistance" value={data.resistance} />
      </div>
    </div>
  );
}

function Metric({ label, value, status }) {
  return (
    <div className="bg-slate-800 p-3 rounded">
      <p className="text-gray-400">{label}</p>
      <p className={`font-semibold ${getColor(status)}`}>
        {value}
      </p>
    </div>
  );
}

function getColor(status) {
  if (status === "Bullish") return "text-green-400";
  if (status === "Bearish") return "text-red-400";
  if (status === "Neutral") return "text-yellow-400";
  return "text-white";
}

function rsiStatus(rsi) {
  if (rsi < 30) return "Bearish";
  if (rsi > 70) return "Bearish";
  if (rsi >= 45 && rsi <= 60) return "Bullish";
  return "Neutral";
}

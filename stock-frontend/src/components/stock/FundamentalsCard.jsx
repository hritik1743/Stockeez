export default function FundamentalsCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-green-400">
        Fundamentals
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Metric label="ROE" value={`${data.roe}%`} />
        <Metric label="ROCE" value={`${data.roce}%`} />
        <Metric label="P/E Ratio" value={data.pe} />
        <Metric label="Debt to Equity" value={data.debt} />
        <Metric label="Revenue Growth" value={`${data.revenueGrowth}%`} />
        <Metric label="EPS Growth" value={`${data.epsGrowth}%`} />
      </div>

      <div className="mt-6">
        <p className="text-gray-400 text-sm">Fundamental Score</p>
        <p className="text-2xl font-bold text-green-400">
          {data.score}/10
        </p>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-slate-800 p-3 rounded">
      <p className="text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

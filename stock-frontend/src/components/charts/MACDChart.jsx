import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MACDChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-4 text-purple-400">
        MACD Histogram
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="macd" fill="#a855f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

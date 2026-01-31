import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function RSIChart({ data }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-4 text-blue-400">
        RSI Indicator
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <ReferenceLine y={70} stroke="red" />
          <ReferenceLine y={30} stroke="green" />
          <Line
            type="monotone"
            dataKey="rsi"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

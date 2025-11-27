import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const LinechartComponent = ({ infoArr }) => {
  const sortedData = [...infoArr].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const daily = sortedData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = 0;
    }

    acc[item.date] += Number(item.amount);

    return acc;
  }, {});

  const chartData = Object.entries(daily).map(([date, total]) => {
    date = new Date(date).toISOString().split("T")[0];
    return { date, total };
  });
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis />
        <XAxis
          dataKey="date"
          tickFormatter={(d) =>
            new Date(d).toLocaleString("en-US", dateOptions)
          }
        />

        <Tooltip />
        <Legend />

        <Area
          stroke="#3B82F6"
          dot={true}
          dataKey="total"
          fill="url(#blueGradient)"
          type="monotone"
          name="Spent on day"
          fillOpacity={0.15}
        ></Area>
        <Tooltip
          formatter={(value) =>
            Number(value).toFixed(2).toLocaleString("en-US", {
              style: "Currency",
              currency: "USD",
            })
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LinechartComponent;

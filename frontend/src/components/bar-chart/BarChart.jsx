import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ infoArr }) => {
  const sortedData = [...infoArr].sort((a,b) => b.amount - a.amount)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sortedData}>
        <YAxis />
        <XAxis dataKey="name"/>

        <Tooltip />
        <Legend />

        <Bar
          dataKey="amount"
          fill="#3B82F6"
          radius={[10, 10, 10, 10]}
          barSize={100}
        ></Bar>

      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;

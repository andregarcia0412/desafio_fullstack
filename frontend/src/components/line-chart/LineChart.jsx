import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

const LinechartComponent = ({infoArr}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={infoArr}>
        <YAxis />
        <XAxis dataKey="name" />

        <Tooltip />
        <Legend />

        <Line
          dataKey="amount"
          fill="#3B82F6"
          dot={false}
        ></Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LinechartComponent;

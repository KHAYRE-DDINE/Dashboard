import React from "react";
import "./Charts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const colors = ["#ff6600", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 500,
    amt: 2,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 350,
    amt: 2,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 160,
    amt: 2,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 1080,
    amt: 2,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 5000,
    amt: 2,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 935,
    amt: 2,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2,
  },
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

function Charts() {
  return (
    <div className="charts">
      <motion.div
        initial={{ rotateY: "360deg", scale: 0.5 }}
        whileInView={{ rotateY: "0deg", scale: 1 }}
        transition={{ duration: 2 }}
        className="chart m-auto w-max"
      >
        <h1 className="title">data science</h1>
        <ResponsiveContainer>
          <BarChart
            width={700}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2" horizontal="true" vertical="" />
            <XAxis
              dataKey="name"
              stroke="#524f4f"
              fontSize={"13px"}
              tickLine={false}
            />
            <YAxis stroke="#524f4f" fontSize={"15px"} tickLine={false} />
            <Bar
              dataKey="uv"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        initial={{ rotateY: "0", scale: 0.5 }}
        whileInView={{
          rotateY: "-360deg",
          scale: 1,
        }}
        transition={{ duration: 2 }}
        className="chart m-auto w-max"
      >
        <h1 className="title">Achievement</h1>
        <ResponsiveContainer>
          <AreaChart
            width={700}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2" horizontal="true" vertical="" />
            <XAxis
              dataKey="name"
              stroke="#524f4f"
              fontSize={"13px"}
              tickLine={false}
            />
            <YAxis stroke="#524f4f" fontSize={"15px"} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type={"monotone"}
              dataKey="uv"
              stackId="1"
              fill="turquoise"
            ></Area>
            <Area type={"monotone"} dataKey="pv" stackId="2" fill="pink"></Area>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        initial={{ rotateY: "360deg", scale: 0.5 }}
        whileInView={{ rotateY: "0deg", scale: 1 }}
        transition={{ duration: 2 }}
        className="chart m-auto w-max"
      >
        <h1 className="title">Analytics</h1>
        <ResponsiveContainer>
          <AreaChart
            width={700}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity="0.4"></stop>
                <stop
                  offset="65%"
                  stopColor="#2451B7"
                  stopOpacity="0.05"
                ></stop>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2" horizontal="true" vertical="" />
            <XAxis
              dataKey="name"
              stroke="#524f4f"
              fontSize={"13px"}
              tickLine={false}
            />
            <YAxis stroke="#524f4f" fontSize={"15px"} tickLine={false} />
            <Tooltip />
            <Legend />
            <Area dataKey="uv" stroke="#2451B7" fill="url(#color)"></Area>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default Charts;

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && label) {
    return (
      <div className="p-4 bg-slate-900 flex-col gap-4 rounded-md ">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          Revenue: <span className="ml-2">{payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400 ">
          Profit: <span className="ml-2">{payload[1].value}</span>
        </p>
      </div>
    );
  }
};

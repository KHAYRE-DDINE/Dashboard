import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  Legend,
} from "recharts";
import { FiTrendingUp, FiUsers, FiAward, FiCalendar } from "react-icons/fi";

const chartDatasets = {
  Weekly: [
    { name: "Mon", uv: 120, pv: 80, amt: 85 },
    { name: "Tue", uv: 190, pv: 110, amt: 90 },
    { name: "Wed", uv: 140, pv: 95, amt: 88 },
    { name: "Thu", uv: 220, pv: 150, amt: 92 },
    { name: "Fri", uv: 180, pv: 130, amt: 86 },
    { name: "Sat", uv: 280, pv: 210, amt: 95 },
    { name: "Sun", uv: 150, pv: 100, amt: 84 },
  ],
  Monthly: [
    { name: "Week 1", uv: 850, pv: 520, amt: 88 },
    { name: "Week 2", uv: 1100, pv: 740, amt: 92 },
    { name: "Week 3", uv: 950, pv: 680, amt: 90 },
    { name: "Week 4", uv: 1300, pv: 890, amt: 96 },
  ],
  Yearly: [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Aug", uv: 4100, pv: 5100, amt: 2800 },
    { name: "Sep", uv: 3800, pv: 4600, amt: 2600 },
    { name: "Oct", uv: 4300, pv: 5300, amt: 2900 },
    { name: "Nov", uv: 4900, pv: 5800, amt: 3100 },
    { name: "Dec", uv: 5200, pv: 6200, amt: 3300 },
  ]
};

const kpiDatasets = {
  Weekly: [
    { label: "Total Points", value: "1,280", trend: "+14.2%", isPositive: true, icon: FiTrendingUp, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Hours Studied", value: "38h", trend: "+8.5%", isPositive: true, icon: FiCalendar, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Study Group", value: "14", trend: "+3.0%", isPositive: true, icon: FiUsers, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Achievements", value: "4", trend: "+1", isPositive: true, icon: FiAward, color: "text-amber-600", bg: "bg-amber-100" },
  ],
  Monthly: [
    { label: "Total Points", value: "4,820", trend: "+11.8%", isPositive: true, icon: FiTrendingUp, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Hours Studied", value: "152h", trend: "+6.4%", isPositive: true, icon: FiCalendar, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Study Group", value: "28", trend: "-1.2%", isPositive: false, icon: FiUsers, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Achievements", value: "11", trend: "+3", isPositive: true, icon: FiAward, color: "text-amber-600", bg: "bg-amber-100" },
  ],
  Yearly: [
    { label: "Total Points", value: "24,592", trend: "+12.5%", isPositive: true, icon: FiTrendingUp, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Hours Studied", value: "1,204h", trend: "+5.2%", isPositive: true, icon: FiCalendar, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Study Group", value: "32", trend: "-2.1%", isPositive: false, icon: FiUsers, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Achievements", value: "18", trend: "+4.1%", isPositive: true, icon: FiAward, color: "text-amber-600", bg: "bg-amber-100" },
  ]
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <p className="text-gray-900 font-bold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Charts() {
  const [timeRange, setTimeRange] = useState("Yearly");

  const currentChartData = chartDatasets[timeRange] || chartDatasets.Yearly;
  const currentKpis = kpiDatasets[timeRange] || kpiDatasets.Yearly;

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 w-full max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900"
        >
          Analytics & Performance
        </motion.h1>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          {["Weekly", "Monthly", "Yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {currentKpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`font-semibold ${kpi.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                {kpi.trend}
              </span>
              <span className="text-gray-400">vs last period</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Performance Overview (Area) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm xl:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
            <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">{timeRange} View</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                <Area type="monotone" name="Science & Math" dataKey="uv" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" name="Languages" dataKey="pv" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Study Hours (Bar) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Study Hours Distribution ({timeRange})</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={12} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                <Bar name="Morning" dataKey="uv" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar name="Evening" dataKey="pv" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Assignment Scores (Area) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Average Scores ({timeRange})</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="step" name="Average Score" dataKey="amt" stroke="#EC4899" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Charts;

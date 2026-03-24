import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Leaf,
  Sprout,
  Activity,
  BarChart3,
  Menu,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  AlertTriangle,
  Settings,
  Bell,
  Search,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const weatherData = [
    { day: "Mon", temp: 28 },
    { day: "Tue", temp: 30 },
    { day: "Wed", temp: 27 },
    { day: "Thu", temp: 29 },
    { day: "Fri", temp: 31 },
    { day: "Sat", temp: 28 },
    { day: "Sun", temp: 26 },
  ];

  const moistureData = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 62 },
    { day: "Wed", value: 58 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 52 },
    { day: "Sat", value: 68 },
    { day: "Sun", value: 70 },
  ];

  const cropData = [
    { name: "Wheat", health: 92 },
    { name: "Rice", health: 88 },
    { name: "Corn", health: 85 },
    { name: "Cotton", health: 78 },
  ];

  return (
    <div className="flex h-screen bg-[#f4fbf7]">

      {/* SIDEBAR */}
      <div className={`${collapsed ? "w-16" : "w-56"} transition-all duration-300 bg-gradient-to-b from-green-700 to-emerald-700 text-white flex flex-col`}>
        <div className="flex items-center gap-2 px-3 py-3">
          <Menu onClick={() => setCollapsed(!collapsed)} className="cursor-pointer" />
          {!collapsed && <h1 className="font-bold text-lg tracking-tight">SmartKrishi 🌱</h1>}
        </div>

        <div className="flex flex-col gap-1 px-2 mt-2">
          {[
            { icon: LayoutDashboard, name: "Dashboard" },
            { icon: Sprout, name: "Crop Recommendation" },
            { icon: Leaf, name: "Fertilizer" },
            { icon: Activity, name: "Disease Detection" },
            { icon: BarChart3, name: "Analytics" },
            { icon: Settings, name: "Settings" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group hover:bg-white/10"
            >
              <item.icon size={18} />
              {!collapsed && <span className="text-sm">{item.name}</span>}
              <div className="absolute right-0 top-0 h-full w-1 bg-green-300 opacity-0 group-hover:opacity-100 rounded-l-lg" />
            </motion.div>
          ))}
        </div>

        <div className="mt-auto px-3 pb-4">
          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full" />
            {!collapsed && <p className="text-sm font-medium">Farmer</p>}
          </div>

          {!collapsed && (
            <button className="mt-3 w-full bg-white/10 hover:bg-white/20 p-2 rounded-lg text-sm">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <div className="flex items-center justify-between px-6 py-3 bg-green-600 text-white shadow-sm">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg w-80">
            <Search size={16} />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full placeholder-white/70"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* ✅ NEW WELCOME BANNER */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 shadow-md">

              <div className="relative z-10 text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome back, Farmer! 🌾
                </h1>
                <p className="text-green-50/90 mt-1 text-sm">
                  Here's an overview of your farm's performance today
                </p>
              </div>

            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-5">
            {[
              { title: "Farm Health", value: "87%", icon: Activity },
              { title: "Active Crops", value: "12", icon: Sprout },
              { title: "Soil Quality", value: "Good", icon: Leaf },
              { title: "Yield Trend", value: "+18%", icon: BarChart3 },
            ].map((item, i) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition flex justify-between items-center"
              >
                <div>
                  <p className="text-xs text-gray-400">{item.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
                </div>

                <div className="p-2 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center w-10 h-10">
                  <item.icon size={18} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* WEATHER + ALERTS */}
          <div className="grid grid-cols-3 gap-6">

            {/* WEATHER (UNCHANGED) */}
            <div className="col-span-2 bg-white p-5 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-4">Weather Forecast</h2>

              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  {
                    val: "28°C",
                    label: "Temperature",
                    icon: Thermometer,
                    bg: "bg-orange-50",
                    text: "text-orange-500",
                    border: "border-orange-200",
                  },
                  {
                    val: "65%",
                    label: "Humidity",
                    icon: Droplets,
                    bg: "bg-blue-50",
                    text: "text-blue-500",
                    border: "border-blue-200",
                  },
                  {
                    val: "12",
                    label: "Wind km/h",
                    icon: Wind,
                    bg: "bg-teal-50",
                    text: "text-teal-500",
                    border: "border-teal-200",
                  },
                  {
                    val: "20%",
                    label: "Rain Chance",
                    icon: CloudRain,
                    bg: "bg-gray-50",
                    text: "text-gray-500",
                    border: "border-gray-200",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-xl border ${item.border} ${item.bg} text-center`}
                  >
                    <item.icon className={`mx-auto mb-2 ${item.text}`} size={18} />
                    <p className={`text-lg font-bold ${item.text}`}>{item.val}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={weatherData}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="temp" stroke="#ea580c" fill="url(#g)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ NEW ALERTS */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" /> Recent Alerts
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "warning",
                    title: "Low Soil Moisture",
                    desc: "Field A3 requires irrigation",
                    icon: Droplets,
                  },
                  {
                    type: "info",
                    title: "Fertilizer Due",
                    desc: "Apply NPK tomorrow",
                    icon: Sprout,
                  },
                  {
                    type: "danger",
                    title: "Disease Alert",
                    desc: "Blight detected in crops",
                    icon: AlertTriangle,
                  },
                ].map((a, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className={`p-4 rounded-2xl flex gap-3 border ${a.type === "danger"
                      ? "bg-red-50 border-red-200"
                      : a.type === "warning"
                        ? "bg-orange-50 border-orange-200"
                        : "bg-blue-50 border-blue-200"
                      }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${a.type === "danger"
                        ? "bg-red-500"
                        : a.type === "warning"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                        }`}
                    >
                      <a.icon className="text-white w-4 h-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CHARTS (UNCHANGED) */}
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="mb-4 font-semibold">Soil Moisture</h2>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="mb-4 font-semibold">Crop Health</h2>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cropData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar dataKey="health" fill="#16a34a" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ✅ NEW SOIL SNAPSHOT */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="mb-5 font-semibold">Soil Condition Snapshot</h2>

            <div className="grid grid-cols-3 gap-5">
              {[
                {
                  name: "Nitrogen",
                  val: 78,
                  bg: "bg-green-50",
                  border: "border-green-200",
                  text: "text-green-600",
                },
                {
                  name: "Phosphorus",
                  val: 65,
                  bg: "bg-blue-50",
                  border: "border-blue-200",
                  text: "text-blue-600",
                },
                {
                  name: "Potassium",
                  val: 82,
                  bg: "bg-purple-50",
                  border: "border-purple-200",
                  text: "text-purple-600",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className={`p-5 rounded-2xl ${item.bg} border ${item.border}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className={`text-lg font-bold ${item.text}`}>
                      {item.val}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>

                  <p className={`text-xs mt-2 ${item.text}`}>
                    Optimal Level
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Sprout,
  Leaf,
  Activity,
  BarChart3,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  AlertTriangle,
  CheckCircle,
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

import Layout from "../components/layout";

export default function Dashboard() {
  const location = useLocation();
  const isNewUser = location.state?.isNewUser;
  const isLoginSuccess = location.state?.isLoginSuccess; // ✅ added

  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false); // ✅ added

  const [userInput, setUserInput] = useState({
    region: "",
    landSize: "",
    soilType: "",
  });

  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    if (isNewUser) {
      setShowPopup(true);
    }

    // ✅ login toast logic
    if (isLoginSuccess) {
      setShowLoginSuccess(true);
      setTimeout(() => setShowLoginSuccess(false), 1500);
    }
  }, [isNewUser, isLoginSuccess]);

  const handleSubmitPopup = () => {
    let errors = {};

    if (!userInput.region) errors.region = "Region is required";
    if (!userInput.landSize) errors.landSize = "Land size is required";
    else if (Number(userInput.landSize) <= 0)
      errors.landSize = "Land size must be positive";
    if (!userInput.soilType) errors.soilType = "Soil image is required";

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    setShowPopup(false);
    setShowSuccess(true);

    // ✅ AUTO CLOSE AFTER 2 SECONDS
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

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
    <Layout>
      <div className="flex-1 overflow-y-auto min-h-screen w-full bg-green-50">

        {/* ✅ LOGIN SUCCESS TOAST */}
        {showLoginSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 md:p-8 rounded-2xl w-[300px] md:w-[350px] shadow-xl flex flex-col items-center gap-4"
            >
              <CheckCircle className="text-green-500 w-12 h-12" />

              <h2 className="text-lg font-bold text-gray-800 text-center">
                Logged in Successfully!
              </h2>

              <p className="text-sm text-gray-500 text-center">
                Welcome back to SmartKrishi 🌱
              </p>
            </motion.div>
          </div>
        )}

        {/* SIGNUP POPUP */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 md:p-8 rounded-2xl w-[350px] md:w-[400px] shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                Quick Setup
              </h2>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Please enter some basic info to get started
              </p>
              <div className="space-y-4">

                {/* (unchanged inputs) */}
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Region (e.g., Goa)"
                    value={userInput.region}
                    onChange={(e) => {
                      setUserInput({ ...userInput, region: e.target.value });
                      setInputErrors({ ...inputErrors, region: "" });
                    }}
                    className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                  {inputErrors.region && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {inputErrors.region}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="number"
                    placeholder="Land Size (acres)"
                    value={userInput.landSize}
                    onChange={(e) => {
                      setUserInput({ ...userInput, landSize: e.target.value });
                      setInputErrors({ ...inputErrors, landSize: "" });
                    }}
                    className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                  {inputErrors.landSize && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {inputErrors.landSize}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setUserInput({ ...userInput, soilType: file });
                      setInputErrors({ ...inputErrors, soilType: "" });
                    }}
                    className="w-full border p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    Upload soil image for analysis
                  </p>

                  {/* ✅ IMAGE PREVIEW */}
                  {userInput.soilType && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(userInput.soilType)}
                        alt="Soil Preview"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}

                  {inputErrors.soilType && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {inputErrors.soilType}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmitPopup}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* SIGNUP SUCCESS */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 md:p-8 rounded-2xl w-[300px] md:w-[350px] shadow-xl flex flex-col items-center gap-4"
            >
              <CheckCircle className="text-green-500 w-12 h-12" />
              <h2 className="text-lg font-bold text-gray-800 text-center">
                Signup Successful!
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Welcome to SmartKrishi 🌱
              </p>
            </motion.div>
          </div>
        )}

        {/* 🔥 EVERYTHING BELOW UNCHANGED */}
        {/* (Welcome, Stats, Weather, Alerts, Charts, Soil Snapshot remain EXACTLY same) */}

        {/* WELCOME */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 shadow-md mx-6 mt-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-left">
            Welcome back, Farmer! 🌾
          </h1>
          <p className="text-green-50/90 mt-1 text-sm text-left">
            Here's an overview of your farm's performance today
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 m-6">
          {[
            { title: "Farm Health", value: "87%", icon: Activity },
            { title: "Active Crops", value: "12", icon: Sprout },
            { title: "Soil Quality", value: "Good", icon: Leaf },
            { title: "Yield Trend", value: "+18%", icon: BarChart3 },
          ].map((item, i) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={i}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition flex justify-between items-center"
            >
              <div>
                <p className="text-xs text-gray-400">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
              </div>

              <div className="p-2 rounded-lg bg-green-500/10 text-green-600 w-10 h-10 flex items-center justify-center">
                <item.icon size={18} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* WEATHER + ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-6">

          {/* WEATHER */}
          <div className="col-span-1 md:col-span-2 bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="font-semibold mb-4">Weather Forecast</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { val: "28°C", label: "Temperature", icon: Thermometer, bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
                { val: "65%", label: "Humidity", icon: Droplets, bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-200" },
                { val: "12", label: "Wind km/h", icon: Wind, bg: "bg-teal-50", text: "text-teal-500", border: "border-teal-200" },
                { val: "20%", label: "Rain Chance", icon: CloudRain, bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
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

          {/* ALERTS */}
          <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-orange-500" /> Recent Alerts
            </h2>

            <div className="space-y-4">
              {[
                { type: "warning", title: "Low Soil Moisture", desc: "Field A3 requires irrigation", icon: Droplets },
                { type: "info", title: "Fertilizer Due", desc: "Apply NPK tomorrow", icon: Sprout },
                { type: "danger", title: "Disease Alert", desc: "Blight detected in crops", icon: AlertTriangle },
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
                  <div className={`p-2 rounded-lg ${a.type === "danger"
                    ? "bg-red-500"
                    : a.type === "warning"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                    }`}>
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

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6">
          <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition">
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

          <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition">
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


        {/* SOIL SNAPSHOT */}
        <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition m-6">
          <h2 className="mb-5 font-semibold">Soil Condition Snapshot</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Nitrogen", val: 78 },
              { name: "Phosphorus", val: 65 },
              { name: "Potassium", val: 82 },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-5 rounded-2xl bg-green-50 border border-green-200 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span className="text-lg font-bold text-green-600">{item.val}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${item.val}%` }} />
                </div>

                <p className="text-xs mt-2 text-green-600">Optimal Level</p>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </Layout>
  );
}
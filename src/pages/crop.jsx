import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import {
    LayoutDashboard,
    Leaf,
    Sprout,
    Activity,
    BarChart3,
    Menu,
    Settings,
    Bell,
    Search,
    MapPin,
    Calendar,
    DollarSign,
} from "lucide-react";

export default function CropRecommendation() {
    const [collapsed, setCollapsed] = useState(false);
    const [rainfall, setRainfall] = useState("");

    return (
        <Layout>
            {/* CONTENT */}
            <div className="p-6 space-y-6 overflow-y-auto">

                {/* BANNER */}
                <div className="w-full">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 shadow-md">
                        <div className="relative z-10 text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                Crop Recommendation 🌾
                            </h1>
                            <p className="text-green-50/90 mt-1 text-sm">
                                Get personalized crop suggestions based on your soil and climate conditions
                            </p>
                        </div>
                    </div>
                </div>

                {/* FORM + RESULT */}
                <div className="grid grid-cols-3 gap-6">

                    {/* LEFT FORM */}
                    <div className="bg-white rounded-xl shadow p-5 space-y-4">

                        <h2 className="font-semibold flex items-center gap-2">
                            <MapPin size={16} /> Farm Details
                        </h2>

                        {/* ✅ Soil Dropdown */}
                        <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                            <label className="text-xs text-green-700">Soil Type</label>
                            <select className="w-full mt-1 p-2 rounded border outline-none">
                                <option value="">Select soil type</option>
                                <option>Clay</option>
                                <option>Loamy</option>
                                <option>Black Soil</option>
                                <option>Sandy</option>
                                <option>Silty</option>
                                <option>Red Soil</option>
                            </select>
                        </div>

                        {/* ✅ Season Dropdown */}
                        <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                            <label className="text-xs text-blue-700">Season</label>
                            <select className="w-full mt-1 p-2 rounded border outline-none">
                                <option value="">Select season</option>
                                <option>Summer</option>
                                <option>Winter</option>
                                <option>Rainy</option>
                            </select>
                        </div>

                        {/* ✅ Rainfall validation */}
                        <div className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                            <label className="text-xs text-purple-700">Annual Rainfall (mm)</label>
                            <input
                                type="number"
                                min="1"
                                value={rainfall}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val >= 0) setRainfall(val);
                                }}
                                placeholder="e.g. 800"
                                className="w-full mt-1 p-2 rounded border outline-none"
                            />
                        </div>

                        {/* Temp */}
                        <div className="p-3 border border-orange-200 rounded-lg bg-orange-50">
                            <label className="text-xs text-orange-700">Avg Temperature (°C)</label>
                            <input
                                type="number"
                                placeholder="e.g. 28"
                                className="w-full mt-1 p-2 rounded border outline-none"
                            />
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                            Get Recommendations
                        </button>
                    </div>

                    {/* RIGHT RESULT */}
                    <div className="col-span-2 bg-white rounded-xl shadow flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <Sprout size={40} className="mx-auto mb-3 text-green-300" />
                            <p>Fill in your farm details to get crop recommendations</p>
                        </div>
                    </div>
                </div>

                {/* TIPS */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="font-semibold mb-4">Crop Selection Tips</h2>

                    <div className="grid grid-cols-3 gap-4">

                        {/* ✅ HOVER POP EFFECT */}
                        {[
                            {
                                icon: Leaf,
                                title: "Match Your Soil",
                                desc: "Choose crops that thrive in your soil type",
                                style: "bg-green-50 border-green-200 text-green-700"
                            },
                            {
                                icon: Calendar,
                                title: "Consider Season",
                                desc: "Plant crops suitable for climate conditions",
                                style: "bg-blue-50 border-blue-200 text-blue-700"
                            },
                            {
                                icon: DollarSign,
                                title: "Market Demand",
                                desc: "Research local market prices before selection",
                                style: "bg-purple-50 border-purple-200 text-purple-700"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`p-4 rounded-xl border flex gap-3 transition ${item.style}`}
                            >
                                <item.icon />
                                <div>
                                    <p className="text-sm font-semibold">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>

            </div>


        </Layout>
    );
}
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
    CheckCircle2,
    Beaker,
    TrendingUp,
} from "lucide-react";

export default function FertilizerPage() {
    const [collapsed, setCollapsed] = useState(false);

    const [soilData, setSoilData] = useState({
        nitrogen: 40,
        phosphorus: 50,
        potassium: 60,
        pH: 6.5,
    });

    const [recommendation, setRecommendation] = useState(null);

    // ✅ FIXED DATABASE (added guide)
    const fertilizerDatabase = [
        {
            name: "Urea (46-0-0)",
            type: "Nitrogen Rich",
            cost: "₹900",
            quantity: "50kg",
            benefits: ["Boosts leaf growth", "Improves chlorophyll", "Fast acting"],
            guide: ["Apply before irrigation", "Avoid overuse", "Best for leafy crops"],
        },
        {
            name: "DAP (18-46-0)",
            type: "Phosphorus Rich",
            cost: "₹1350",
            quantity: "50kg",
            benefits: ["Root development", "Early growth", "Strong plants"],
            guide: ["Use during sowing", "Mix with soil", "Avoid waterlogging"],
        },
        {
            name: "NPK 10-26-26",
            type: "Balanced",
            cost: "₹1800",
            quantity: "25kg",
            benefits: ["Improves yield", "Balanced nutrients", "Healthy crop"],
            guide: ["Apply in split doses", "Use with irrigation", "Suitable for most crops"],
        },
    ];

    // ✅ FIXED LOGIC
    const handleSubmit = () => {
        if (soilData.nitrogen < 40) setRecommendation(fertilizerDatabase[0]);
        else if (soilData.phosphorus < 40) setRecommendation(fertilizerDatabase[1]);
        else setRecommendation(fertilizerDatabase[2]);
    };

    const getStatus = (val) => {
        if (val < 30) return "Low";
        if (val < 60) return "Medium";
        return "Good";
    };

    return (
        <Layout>
            {/* BANNER */}
            <div className="w-full">
                <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 shadow-md">
                    <h1 className="text-2xl md:text-3xl font-bold text-white text-left">
                        Fertilizer Recommendation 🧪
                    </h1>
                    <p className="text-green-50/90 mt-1 text-sm text-left">
                        Here's your smart fertilizer recommendation system
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">

                {/* SOIL INPUT */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">

                    <div className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 p-4">
                        <h2 className="flex items-center gap-3 text-xl font-bold">
                            <div className="p-2 rounded-xl bg-teal-500">
                                <Beaker className="text-white w-5 h-5" />
                            </div>
                            Soil Data Input
                        </h2>
                    </div>

                    <div className="p-5 space-y-4">

                        {/* ✅ FIXED KEYS */}
                        {["nitrogen", "phosphorus", "potassium"].map((key, i) => (
                            <div key={i} className="p-3 rounded-lg bg-green-50 border">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="capitalize">{key}</span>
                                    <span>{soilData[key]}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={soilData[key]}
                                    onChange={(e) => setSoilData({ ...soilData, [key]: +e.target.value })}
                                    className="w-full"
                                />
                                <p className="text-xs">{getStatus(soilData[key])}</p>
                            </div>
                        ))}

                        {/* ✅ Soil pH */}
                        <div className="p-3 rounded-lg bg-blue-50 border">
                            <label className="text-sm font-semibold">Soil pH</label>
                            <input
                                type="number"
                                value={soilData.pH}
                                onChange={(e) => setSoilData({ ...soilData, pH: +e.target.value })}
                                className="w-full p-2 mt-1 border rounded"
                            />
                        </div>

                        <button onClick={handleSubmit}
                            className="w-full bg-green-600 text-white py-2 rounded-lg">
                            Get Recommendation
                        </button>
                    </div>
                </div>

                {/* RESULT */}
                <div className="col-span-2 bg-white rounded-xl shadow-xl overflow-hidden">

                    <div className="border-b bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                        <h2 className="flex items-center gap-3 text-xl font-bold">
                            <div className="p-2 rounded-xl bg-green-500 text-left">
                                <TrendingUp className="text-white w-5 h-5 text-left" />
                            </div>
                            Recommended Fertilizer
                        </h2>
                    </div>

                    <div className="p-6">

                        {!recommendation ? (
                            <div className="text-center text-gray-400">
                                No recommendation yet
                            </div>
                        ) : (
                            <div className="space-y-5">

                                <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-left">
                                    <h2 className="text-2xl font-bold text-white">
                                        {recommendation.name}
                                    </h2>
                                    <p className="text-green-100">{recommendation.type}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-green-50 rounded border">
                                        <h3 className="font-bold mb-2 text-black">Cost</h3>
                                        {recommendation.cost}
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded border">
                                        <h3 className="font-bold mb-2 text-black">Quantity</h3>
                                        {recommendation.quantity}
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-bold mb-2 text-left">Key Benefits</h3>
                                    {recommendation.benefits.map((b, i) => (
                                        <p key={i} className="flex gap-2 text-sm">
                                            <CheckCircle2 size={16} /> {b}
                                        </p>
                                    ))}
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg text-left">
                                    <h3 className="font-bold mb-2 text-left">Application Guidelines</h3>
                                    {recommendation.guide.map((g, i) => (
                                        <p key={i} className="text-sm">• {g}</p>
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ADDITIONAL CARDS (unchanged) */}
            <div className="grid grid-cols-3 gap-6">
                {fertilizerDatabase.map((f, index) => (
                    <motion.div key={index} whileHover={{ y: -8 }}>
                        <div className="shadow-xl rounded-xl bg-gradient-to-br from-white to-green-50 overflow-hidden">
                            <div className="border-b bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                <h3 className="font-bold">{f.name}</h3>
                                <span className="text-sm text-green-600">{f.type}</span>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between bg-green-50 p-3 rounded">
                                    <span>Price</span>
                                    <span>{f.cost}</span>
                                </div>
                                <div className="flex justify-between bg-blue-50 p-3 rounded">
                                    <span>Package</span>
                                    <span>{f.quantity}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>        
    </Layout >
    );
}
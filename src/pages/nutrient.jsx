import { useState } from "react";
import { motion } from "framer-motion";
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
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import Layout from "../components/layout";

export default function NutrientDeficiencyPage() {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState([]);

  const mockResults = [
    {
      nutrient: "Nitrogen",
      symbol: "N",
      severity: "Medium",
      confidence: 88,
      symptoms: ["Yellow leaves", "Slow growth", "Pale color"],
      solutions: ["Apply urea", "Use compost", "Foliar spray"],
      effects: "Important for chlorophyll production",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setResults([]);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults(mockResults);
      setAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview("");
    setResults([]);
  };

  return (
    <Layout>

      {/* ✅ WRAPPER FOR SPACING */}
      <div className="space-y-6">

        {/* BANNER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 shadow-md mb-2">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Nutrient Deficiency Detection 🔍
            </h1>
            <p className="text-green-50 mt-1 text-sm">
              Upload plant images to detect nutrient issues instantly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* UPLOAD */}
          <div className="bg-white rounded-xl shadow-lg p-5 col-span-1">

            {!preview ? (
              <label className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-green-300 rounded-xl cursor-pointer bg-green-50 hover:bg-green-100">
                <Upload className="w-10 h-10 text-green-600 mb-2" />
                <p className="text-green-700 font-semibold">Upload Image</p>
                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>
            ) : (
              <div className="relative">
                <img src={preview} className="rounded-xl h-72 w-full object-cover" />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {selectedFile && (
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className={`mt-4 w-full py-2 rounded-lg text-white ${
                  analyzing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600"
                }`}
              >
                {analyzing ? "Analyzing..." : "Detect"}
              </button>
            )}
          </div>

          {/* RESULTS */}
          <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">

            {!results.length ? (
              <p className="text-gray-400 text-center mt-10">
                Upload an image to detect nutrient deficiency 🌱
              </p>
            ) : (
              results.map((r, i) => (
                <div key={i} className="space-y-4">

                  {/* HEADER */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5 rounded-xl text-left">
                    <h2 className="text-xl font-bold text-white">
                      {r.nutrient} ({r.symbol})
                    </h2>
                    <p>{r.severity} Severity</p>
                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2 text-left">Symptoms</h3>
                      {r.symptoms.map((s, idx) => (
                        <p key={idx} className="text-sm flex gap-2 text-left">
                          <AlertCircle size={14} /> {s}
                        </p>
                      ))}
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2 text-left">Solutions</h3>
                      {r.solutions.map((s, idx) => (
                        <p key={idx} className="text-sm flex gap-2 text-left">
                          <CheckCircle2 size={14} /> {s}
                        </p>
                      ))}
                    </div>

                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2 text-left">Effect</h3>
                    <p className="text-sm text-left">{r.effects}</p>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: "Early Detection", color: "from-green-50 to-emerald-50" },
            { title: "Accurate Results", color: "from-lime-50 to-green-50" },
            { title: "Easy Upload", color: "from-emerald-50 to-teal-50" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -5 }}>
              <div className={`p-5 rounded-xl shadow bg-gradient-to-br ${item.color}`}>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Smart AI powered detection for better farming decisions
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Layout>
  );
}
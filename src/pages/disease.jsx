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
  UploadCloud,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function DiseasePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <Layout>


      {/* BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-6 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-left">
          <h1 className="text-3xl font-bold text-white relative z-10">
            Plant Disease Detection 🌿
          </h1>
          <p className="text-green-100 mt-1 text-sm relative z-10">
            Upload plant images to detect diseases instantly
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* UPLOAD */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
        >
          <h2 className="font-semibold text-gray-700 mb-4 flex gap-2">
            <UploadCloud size={18} /> Upload Plant Image
          </h2>

          <label className="flex flex-col items-center justify-center rounded-xl h-64 cursor-pointer 
              bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 border border-green-300 shadow-inner">

            {image ? (
              <motion.img
                src={image}
                className="h-full object-contain rounded-lg p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : (
              <div className="text-center text-green-800">
                <UploadCloud size={42} className="mx-auto mb-3" />
                <p className="font-semibold">Upload Plant Image</p>
                <p className="text-xs opacity-70 mt-1">PNG, JPG (Max 10MB)</p>
              </div>
            )}

            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </motion.div>

        {/* DETECTION BOX (IMPROVED + ANIMATED) */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border border-green-100"
        >
          <h2 className="font-semibold text-gray-700 mb-4 flex gap-2">
            <Leaf size={18} /> Detection Results
          </h2>

          {!image ? (
            <div className="flex items-center gap-3 text-gray-400">
              <Leaf size={30} className="opacity-40" />
              <p>No image uploaded</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >

              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-lg shadow-sm">
                  <CheckCircle size={28} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-600">
                    Healthy Plant
                  </h3>
                  <p className="text-sm text-gray-500">
                    No disease symptoms detected.
                  </p>
                </div>
              </div>

              {/* PROGRESS BAR WITH ANIMATION */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Confidence</span>
                  <span className="text-green-600 font-medium">92%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>

            </motion.div>
          )}
        </motion.div>
      </div>

      {/* VISUAL GUIDE */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-gray-700 mb-6">
          Visual Comparison Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Healthy",
              desc: "Bright green leaves, no spots",
              icon: CheckCircle,
              color: "green",
            },
            {
              title: "Early Stage",
              desc: "Small spots, slight yellowing",
              icon: AlertCircle,
              color: "yellow",
            },
            {
              title: "Advanced",
              desc: "Large damage, spreading infection",
              icon: XCircle,
              color: "red",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-5 rounded-xl border flex items-start gap-4 shadow-sm
                  ${card.color === "green" && "bg-green-50 border-green-200"}
                  ${card.color === "yellow" && "bg-yellow-50 border-yellow-200"}
                  ${card.color === "red" && "bg-red-50 border-red-200"}
                  `}
            >
              <div className={`p-3 rounded-lg text-white shadow
                    ${card.color === "green" && "bg-green-500"}
                    ${card.color === "yellow" && "bg-yellow-500"}
                    ${card.color === "red" && "bg-red-500"}
                  `}>
                <card.icon size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </Layout>
  );
}
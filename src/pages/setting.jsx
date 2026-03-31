import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Lock,
  Globe,
  Phone,
  Info,
  Trash2,
  Star,
  Shield,
  ChevronRight,
} from "lucide-react";
import Layout from "../components/layout";

export default function SettingsPage() {
  return (
    <Layout>
        {/* PROFILE */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-md p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/60"
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="font-semibold text-lg">Farmer Name</h2>
              <p className="text-sm text-green-100">farmer@email.com</p>
            </div>
          </div>
          <button className="text-sm bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition">
            Edit Profile
          </button>
        </div>

        {/* PERSONAL DETAILS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="px-5 py-4 font-semibold text-gray-700">
            Personal Details
          </h2>

          {["Full Name", "Email", "Phone"].map((field, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="text-gray-600">{field}</span>
              <button className="text-green-600 text-sm flex items-center gap-1 font-medium">
                Edit <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* SETTINGS LIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            {
              icon: Bell,
              name: "Notifications",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: Lock,
              name: "Password",
              color: "bg-purple-100 text-purple-600",
            },
            {
              icon: Globe,
              name: "Language",
              color: "bg-yellow-100 text-yellow-600",
            },
            {
              icon: Phone,
              name: "Contact Us",
              color: "bg-pink-100 text-pink-600",
            },
            {
              icon: Info,
              name: "About Us",
              color: "bg-gray-100 text-gray-600",
            },
            {
              icon: Star,
              name: "Rate Us",
              color: "bg-orange-100 text-orange-600",
            },
            {
              icon: Shield,
              name: "Data & Privacy",
              color: "bg-teal-100 text-teal-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <span className="text-gray-700 font-medium">
                  {item.name}
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </motion.div>
          ))}
        </div>

        {/* DELETE ACCOUNT */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="text-red-500" />
            </div>
            <div>
              <p className="text-red-600 font-semibold">
                Delete Account
              </p>
              <p className="text-sm text-red-400">
                This action is permanent
              </p>
            </div>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Delete
          </button>
        </div>
    </Layout>
  );
}
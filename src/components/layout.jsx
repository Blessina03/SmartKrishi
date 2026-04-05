import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Settings,
  Menu,
} from "lucide-react";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4fbf7] flex">

      {/* SIDEBAR */}
      <div
        className={`${collapsed ? "w-16" : "w-56"
          } transition-all duration-300 bg-teal-900 text-white flex flex-col`}
      >
        {/* HAMBURGER */}
        {/* HAMBURGER + BRAND */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`h-14 flex items-center ${collapsed ? "justify-center" : "px-4 gap-3"
            } cursor-pointer hover:bg-white/10`}
        >
          <Menu size={24} />

          {!collapsed && (
            <h1 className="text-lg font-bold text-white tracking-wide">
              Smart Krishi
            </h1>
          )}
        </div>

        {/* MENU */}
        <div className={`flex flex-col mt-4 ${collapsed ? "gap-8 items-center" : "gap-6 px-3"}`}>
          {[
            { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
            { icon: Bot, name: "AI Assistance", path: "/chatbot" },
            { icon: Settings, name: "Settings", path: "/setting" },
          ].map((item, i) => (
            <motion.div
              key={i}
              onClick={() => navigate(item.path)}
              whileHover={{ x: collapsed ? 0 : 5 }}
              className={`relative flex ${collapsed
                  ? "justify-center w-full py-3 group"
                  : "gap-4 py-2 group items-center"
                } rounded-xl cursor-pointer hover:bg-white/10 transition-all`}
            >
              {!collapsed && (
                <span className="absolute right-0 top-0 h-full w-1 bg-green-400 rounded-l opacity-0 group-hover:opacity-100 transition"></span>
              )}

              <item.icon size={24} />

              {!collapsed && (
                <span className="text-[16px] font-semibold">
                  {item.name}
                </span>
              )}

              {collapsed && (
                <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 
                bg-black text-white text-xs px-2 py-1 rounded-md 
                opacity-0 group-hover:opacity-100 whitespace-nowrap z-[9999] shadow-lg">
                  {item.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* PROFILE */}
        <div className="mt-auto px-3 pb-4">
          {collapsed ? (
            <div className="flex justify-center">
              <img
                src="https://i.pravatar.cc/40"
                className="w-9 h-9 rounded-full"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm font-medium">Farmer</p>
              </div>

              <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </div>
    </div>
  );
}
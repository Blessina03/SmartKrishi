import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Settings,
  Menu,
  Bell,
  Search,
} from "lucide-react";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen bg-[#f4fbf7] flex flex-col">

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-4 h-12 bg-green-600 text-white shadow-sm">

        {/* LEFT: LOGO + SEARCH */}
        <div className="flex items-center gap-10">

          <div
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Menu size={24} />
            <h1 className="font-bold text-xl">SmartKrishi 🌱</h1>
          </div>

          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-md w-80">
            <Search size={16} />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full placeholder-white/70"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Bell size={20} className="cursor-pointer" />
          <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full" />
        </div>
      </div>

      {/* BELOW NAVBAR */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <div
          className={`${
            collapsed ? "w-16" : "w-56"
          } transition-all duration-300 bg-gradient-to-b from-green-700 to-emerald-700 text-white flex flex-col`}
        >
          {/* MENU */}
          <div className={`flex flex-col mt-6 ${collapsed ? "gap-8 items-center" : "gap-6 px-3"}`}>
            {[
              { icon: LayoutDashboard, name: "Dashboard" },
              { icon: Bot, name: "AI Assistance" },
              { icon: Settings, name: "Settings" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: collapsed ? 0 : 5 }}
                className={`relative flex ${
                  collapsed
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

          {/* PROFILE SECTION (FIXED CLEAN ALIGNMENT) */}
          <div className="mt-auto px-3 pb-4">

            {collapsed ? (
              // COLLAPSED VIEW
              <div className="flex justify-center">
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-9 h-9 rounded-full"
                />
              </div>
            ) : (
              // EXPANDED VIEW
              <div className="flex flex-col gap-3">

                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/40"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-sm font-medium">Farmer</p>
                </div>

                {/* Logout */}
                <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition">
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
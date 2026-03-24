import { useState } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/hero-farm.jpg"; 

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌾 Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="farm"
          className="w-full h-full object-cover"
        />

        {/* 🌿 Light Overlay (very low opacity) */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-800/10 to-emerald-900/20"></div>
      </div>

      {/* 🧊 Fully Transparent Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className=" bg-transparent border border-white/20 rounded-2xl w-full max-w-md p-8 z-10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      >
        {/* ✨ Subtle glass layer (optional but recommended) */}
        <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none"></div>

        {/* 🌱 Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2 relative z-10">
          🌱 SmartKrishi
        </h2>
        <p className="text-center text-white/70 mb-6 relative z-10">
          {isLogin ? "Welcome Back" : "Create your account"}
        </p>

        {/* 📋 Form */}
        <form className="space-y-4 relative z-10">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          )}

          {/* 🔘 Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500/90 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* 🔁 Toggle */}
        <p className="text-center text-white/70 mt-6 relative z-10">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={toggleMode}
            className="text-emerald-300 font-semibold cursor-pointer ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
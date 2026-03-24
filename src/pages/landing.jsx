import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Sprout,
  BarChart3,
  FlaskConical,
  Bug,
  CloudSun,
  LayoutDashboard,
  ArrowRight,
  Leaf,
  Users,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Heart,
  Globe,
  Quote,
  ChevronRight,
} from "lucide-react";

import heroImage from "../assets/hero-farm.jpg";

/* ---------------- DATA ---------------- */

const heroImages = [
  heroImage,
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80",
];

const features = [
  {
    icon: Sprout,
    title: "Crop Recommendation",
    desc: "AI suggests best crops based on soil & climate.",
    to: "/crop-recommendation",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: BarChart3,
    title: "Yield Prediction",
    desc: "Predict yields using AI-driven models.",
    to: "/yield-prediction",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: FlaskConical,
    title: "Fertilizer Guide",
    desc: "Smart fertilizer usage recommendations.",
    to: "/fertilizer",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: Bug,
    title: "Disease Detection",
    desc: "Upload leaf image & detect diseases instantly.",
    to: "/disease-detection",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: CloudSun,
    title: "Weather Forecast",
    desc: "Real-time weather insights for your farm.",
    to: "/weather",
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "All farming insights in one place.",
    to: "/dashboard",
    gradient: "from-purple-500/20 to-violet-500/20",
  },
];

const stats = [
  { icon: Users, value: "10K+", label: "Farmers" },
  { icon: Leaf, value: "50K+", label: "Acres" },
  { icon: Target, value: "95%", label: "Accuracy" },
  { icon: TrendingUp, value: "30%", label: "Yield Boost" },
];

const steps = [
  { number: "01", title: "Enter Details", desc: "Provide farm data", icon: Sprout },
  { number: "02", title: "AI Analysis", desc: "AI processes your data", icon: Zap },
  { number: "03", title: "Get Results", desc: "Receive smart insights", icon: Target },
];

const testimonials = [
  { name: "Rajesh Kumar", text: "Yield increased by 25%!", avatar: "RK" },
  { name: "Priya Sharma", text: "Saved my crops instantly!", avatar: "PS" },
  { name: "Suresh Patel", text: "Reduced fertilizer cost.", avatar: "SP" },
];

/* ---------------- COMPONENT ---------------- */

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentImage((p) => (p + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center">

        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === currentImage ? 1 : 0 }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/40 to-black/70"></div>

        {/* NAVBAR */}
        <nav className="absolute top-0 w-full px-8 py-4 flex justify-between items-center backdrop-blur-md bg-white/10 border-b border-white/10">
          <h1 className="text-white font-bold flex items-center gap-2">
            <Leaf /> SmartKrishi
          </h1>

          <Link
            to="/dashboard"
            className="px-5 py-2 bg-green-600 text-white rounded-full shadow hover:scale-105 transition"
          >
            Get Started
          </Link>
        </nav>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-3xl">

          <h1 className="text-5xl md:text-7xl font-bold text-white relative">
            <span className="absolute inset-0 blur-2xl opacity-30 bg-green-500 rounded-full"></span>
            <span className="relative">
              Smart Farming <br />
              <span className="text-green-400">Powered by AI</span>
            </span>
          </h1>

          <p className="mt-6 text-white/80">
            Increase productivity and make smarter farming decisions.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-green-600 text-white rounded-full shadow-lg hover:scale-105 transition"
            >
              Get Started <ArrowRight className="inline ml-2" size={16} />
            </Link>

            <Link
              to="/crop-recommendation"
              className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition"
            >
              Try Feature
            </Link>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="relative -mt-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 text-center shadow-lg">
              <s.icon className="mx-auto text-green-600 mb-2" />
              <h2 className="text-2xl font-bold">{s.value}</h2>
              <p className="text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Link
              key={i}
              to={f.to}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}>
                <f.icon className="text-green-600" />
              </div>
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
              <span className="text-green-600 text-sm flex items-center mt-3">
                Explore <ChevronRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-16">How It Works</h2>

        <div className="flex flex-col md:flex-row justify-center gap-12 relative">
          {steps.map((s, i) => (
            <div key={i} className="text-center max-w-xs">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 bg-green-600 rounded-xl"></div>
                <div className="absolute -bottom-2 -right-2 bg-green-200 px-2 py-1 text-xs rounded">
                  {s.number}
                </div>
                <div className="relative flex items-center justify-center h-full text-white">
                  <s.icon />
                </div>
              </div>

              <h3 className="mt-6 font-bold">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[Zap, Shield, Heart, Globe].map((Icon, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl text-center shadow hover:shadow-lg transition">
              <Icon className="mx-auto text-green-600 mb-2" />
              <p className="font-semibold">Feature {i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-green-900 py-24 text-white">
        <h2 className="text-4xl text-center mb-12">Testimonials</h2>

        <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 bg-white/10 backdrop-blur rounded-xl">
              <Quote />
              <p className="mt-2">{t.text}</p>
              <p className="mt-3 font-bold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 text-center">
        <p>© 2026 SmartKrishi</p>
      </footer>

    </div>
  );
};

export default LandingPage;
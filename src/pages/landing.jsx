import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sprout,
  BarChart3,
  FlaskConical,
  Bug,
  Leaf,
  Users,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Heart,
  Globe,
  Quote,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
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
    desc: "AI suggests the best crops based on your soil & climate conditions.",
    to: "/crop-recommendation",
  },
  {
    icon: BarChart3,
    title: "Yield Prediction",
    desc: "Accurately predict your crop yields using AI-driven models.",
    to: "/yield-prediction",
  },
  {
    icon: FlaskConical,
    title: "Fertilizer Guide",
    desc: "Get smart fertilizer usage recommendations for healthy crops.",
    to: "/fertilizer",
  },
  {
    icon: Bug,
    title: "Disease Detection",
    desc: "Detect plant diseases instantly with AI assistance.",
    to: "/disease-detection",
  },
];

const steps = [
  { title: "Enter Details", desc: "Provide farm data like soil, weather.", icon: Sprout },
  { title: "AI Analysis", desc: "AI analyzes your farm data to create insights.", icon: Zap },
  { title: "Get Results", desc: "Receive actionable recommendations.", icon: Target },
];

const whyChoose = [
  { icon: Zap, title: "Fast AI Insights", desc: "Quick and actionable recommendations." },
  { icon: Shield, title: "Reliable Models", desc: "Accurate predictions for better planning." },
  { icon: Heart, title: "Farmer Friendly", desc: "Easy-to-use tools for everyone." },
  { icon: Globe, title: "Scalable Platform", desc: "Works for farms of all sizes." },
];

const testimonials = [
  { name: "Rajesh Kumar", text: "Yield increased by 25%! The AI predictions helped me plan better.", avatar: "RK" },
  { name: "Priya Sharma", text: "Saved my crops instantly using the disease detection feature. Truly amazing!", avatar: "PS" },
  { name: "Suresh Patel", text: "Reduced fertilizer cost without affecting yield. Smart recommendations!", avatar: "SP" },
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
    <div className="min-h-screen overflow-x-hidden font-sans">

      {/* HERO */}
      <header className="relative h-[80vh] flex items-center justify-center">
        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === currentImage ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/40 to-black/70"></div>

        {/* NAVBAR */}
        <nav className="absolute top-0 w-full px-6 py-4 flex justify-between items-center">
          <h1 className="text-white font-bold flex items-center gap-2 text-2xl md:text-4xl">
            <Leaf /> SmartKrishi
          </h1>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Smart Farming <br />
            <span className="text-green-400">Powered by AI</span>
          </h1>
          <p className="mt-4 text-white/80 text-base md:text-lg">
            Increase productivity and make smarter farming decisions.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="px-6 py-2 md:px-8 md:py-3 bg-green-600 text-white rounded-full shadow-lg hover:scale-105 transition"
            >
              Get Started <ArrowRight className="inline ml-2" size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="relative px-6 py-12 bg-green-100">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Core Features</h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Smart tools designed to improve productivity and efficiency
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <Link
              key={i}
              to={f.to}
              className="group text-center p-4 md:p-6 bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-gray-800 text-2xl md:text-3xl mb-2 md:mb-4">
                <f.icon className="mx-auto text-green-600" size={24} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900">{f.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-green-200 z-0"></div>
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-2">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <s.icon className="text-green-600" size={24} />
                </div>
                <h3 className="font-semibold text-base md:text-lg">{s.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">AI-powered tools for smarter farming decisions</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
          {whyChoose.map((item, i) => (
            <div key={i} className="p-4 md:p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
              <item.icon className="text-green-600 mx-auto mb-2 md:mb-4" size={24} />
              <h3 className="font-semibold text-sm md:text-base text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
          <p className="text-white/80 mt-1 text-sm md:text-base">Hear what our farmers say about SmartKrishi</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {testimonials.map((t, i) => (
            <div key={i} className="p-4 md:p-6 bg-white/10 backdrop-blur rounded-xl flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mb-3 md:mb-4 text-sm md:text-base">
                {t.avatar}
              </div>
              <Quote className="text-green-400 mb-2" />
              <p className="text-white/90 text-xs md:text-sm mb-2">{t.text}</p>
              <p className="font-semibold text-white text-sm md:text-base">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="text-green-400" size={28} />
            <span className="font-bold text-xl">SmartKrishi</span>
          </div>

          <div className="flex gap-8">
            <div>
              <h4 className="font-semibold mb-2">Links</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex gap-4 mt-1">
                <a href="#"><Twitter className="text-gray-400 hover:text-green-400" size={18} /></a>
                <a href="#"><Facebook className="text-gray-400 hover:text-green-400" size={18} /></a>
                <a href="#"><Instagram className="text-gray-400 hover:text-green-400" size={18} /></a>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-center mt-6 text-sm">© 2026 SmartKrishi</p>
      </footer>
    </div>
  );
};

export default LandingPage;
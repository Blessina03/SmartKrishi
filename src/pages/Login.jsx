import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/hero-farm.jpg";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!isLogin && !form.name) newErrors.name = "Name is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!form.email.includes("@") || !form.email.includes("gmail.com"))
      newErrors.email = "Enter a valid Gmail address";

    if (!form.password) newErrors.password = "Password is required";
    else if (
      form.password.length < 8 ||
      !/\d/.test(form.password) ||
      !/[!@#$%^&*]/.test(form.password)
    )
      newErrors.password =
        "Password must be at least 8 characters, include 1 number & 1 special character";

    if (!isLogin) {
      if (!form.confirmPassword)
        newErrors.confirmPassword = "Confirm your password";
      else if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isLogin) {
        // ✅ Navigate first, show popup in dashboard
        navigate("/dashboard", { state: { isLoginSuccess: true } });
      } else {
        navigate("/dashboard", { state: { isNewUser: true } });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="farm" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-800/10 to-emerald-900/20"></div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-transparent border border-white/20 rounded-2xl w-full max-w-md p-8 z-10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      >
        <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-center text-white mb-2 relative z-10">
          🌱 SmartKrishi
        </h2>

        <p className="text-center text-white/70 mb-6 relative z-10">
          {isLogin ? "Welcome Back" : "Create your account"}
        </p>

        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {errors.name && (
                <p className="text-red-300 text-sm">{errors.name}</p>
              )}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          {errors.email && (
            <p className="text-red-300 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-white/70"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-300 text-sm">{errors.password}</p>
          )}

          {!isLogin && (
            <>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className="w-full px-4 py-2 pr-10 bg-white/20 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-2.5 cursor-pointer text-white/70"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-300 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500/90 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

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
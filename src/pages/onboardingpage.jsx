import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Ruler,
  Camera,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import logo from "@/assets/logo.png";
import bgImage from "@/assets/agriculture-bg.jpg"; // 🌾 add your image here

const regions = [
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
  "North-East India",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [region, setRegion] = useState("");
  const [landSize, setLandSize] = useState("");
  const [soilImage, setSoilImage] = useState(null);
  const [soilFile, setSoilFile] = useState(null);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSoilFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setSoilImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Step Validation
  const canProceed = () => {
    if (step === 0) return region !== "";
    if (step === 1) return landSize !== "";
    return true;
  };

  // Finish
  const handleComplete = () => {
    const profile = {
      region,
      landSize,
      hasSoilImage: !!soilImage,
    };

    localStorage.setItem("krishi-onboarded", "true");
    localStorage.setItem("krishi-profile", JSON.stringify(profile));

    navigate("/dashboard");
  };

  const steps = [
    {
      icon: MapPin,
      title: "Your Region",
      subtitle: "Select your farming region",
      content: (
        <div className="space-y-4">
          <Label>Select Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      icon: Ruler,
      title: "Land Size",
      subtitle: "Enter your farm size",
      content: (
        <div className="space-y-4">
          <Label>Land Size (acres)</Label>
          <Input
            type="number"
            placeholder="e.g. 5"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
          />
        </div>
      ),
    },
    {
      icon: Camera,
      title: "Soil Image (Optional)",
      subtitle: "Upload soil photo for AI analysis",
      content: (
        <div className="space-y-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />

          {soilImage ? (
            <div className="relative">
              <img
                src={soilImage}
                alt="Soil Preview"
                className="h-48 w-full rounded-xl object-cover border"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => {
                  setSoilImage(null);
                  setSoilFile(null);
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current.click()}
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Upload className="h-8 w-8" />
              <p className="text-sm font-medium">Click to upload</p>
              <p className="text-xs">JPG/PNG up to 10MB</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🌫 Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <motion.div
        className="relative w-full max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-white">Smart Krishi</h1>
        </div>

        {/* Progress */}
        <div className="mb-8 flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i <= step ? "w-12 bg-white" : "w-8 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl p-8 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  {(() => {
                    const Icon = steps[step].icon;
                    return <Icon className="h-5 w-5 text-green-600" />;
                  })()}
                </div>

                <div>
                  <h2 className="font-bold text-gray-800">
                    {steps[step].title}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {steps[step].subtitle}
                  </p>
                </div>
              </div>

              {/* Content */}
              {steps[step].content}
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {step < steps.length - 1 ? (
              <Button
                disabled={!canProceed()}
                onClick={() => setStep(step + 1)}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Finish <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
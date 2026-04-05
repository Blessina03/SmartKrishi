import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { motion } from "framer-motion";

export default function AiAssistant() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState("init");
  const [operation, setOperation] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const chatRef = useRef();

  // ✅ Fix duplicate messages (Strict Mode)
  const hasStarted = useRef(false);

  const time = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const addBot = (msg) =>
    setMessages((prev) => [...prev, { type: "bot", ...msg, time: time() }]);

  const addUser = (text, extra = {}) =>
    setMessages((prev) => [
      ...prev,
      { type: "user", text, time: time(), ...extra },
    ]);

  // INIT
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    startChat();
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const startChat = () => {
    addBot({ text: "Hi Farmer 👋 Welcome to SmartKrishi AI!" });

    setTimeout(() => {
      showOperations();
    }, 800);
  };

  // OPERATIONS
  const showOperations = () => {
    setStep("operation");

    addBot({
      text: "What would you like to do?",
      options: [
        { label: "🌾 Crop Recommendation", value: "crop" },
        { label: "🧪 Fertilizer Recommendation", value: "fertilizer" },
        { label: "📈 Yield Prediction", value: "yield" },
        { label: "🦠 Disease Detection", value: "disease" },
      ],
    });
  };

  // QUESTIONS
  const flows = {
    crop: [
      "What is the Nitrogen (N) level? (e.g., 90)",
      "What is the Phosphorus (P) level? (e.g., 40)",
      "What is the Potassium (K) level? (e.g., 40)",
      "What is the temperature (°C)? (e.g., 25)",
      "What is the humidity (%)? (e.g., 60)",
      "What is the soil pH level? (e.g., 6.5)",
      "What is the rainfall (mm)? (e.g., 200)",
      "Which crop was grown last year? (e.g., Rice)",
    ],
    fertilizer: [
      "What is the soil type? (e.g., Loamy)",
      "What is the soil pH level? (e.g., 6.5)",
      "What is the soil moisture (%)? (e.g., 60)",
      "What is the nitrogen level? (e.g., 50)",
      "What is the phosphorus level? (e.g., 40)",
      "What is the potassium level? (e.g., 45)",
      "Which crop are you growing? (e.g., Wheat)",
      "What is the season? (e.g., Rabi)",
    ],
    yield: [
      "Which state? (e.g., Maharashtra)",
      "Which district? (e.g., Pune)",
      "Which crop? (e.g., Wheat)",
      "What is the crop year? (e.g., 2023)",
      "What is the season? (e.g., Rabi)",
    ],
  };

  // OPTION CLICK
  const handleOptionClick = (opt) => {
    if (step !== "operation") return;

    setStep("locked"); // prevent double click
    addUser(opt.label);

    setOperation(opt.value);
    setAnswers({});
    setIndex(0);

    if (opt.value === "disease") {
      setStep("upload");

      setTimeout(() => {
        addBot({
          text: "Upload a crop image for disease detection 📷",
          upload: true,
        });
      }, 400);

      return;
    }

    setStep("question");

    setTimeout(() => {
      addBot({ text: flows[opt.value][0] });
    }, 400);
  };

  // INPUT SEND
  const handleSend = () => {
    if (!input.trim() || step !== "question") return;

    addUser(input);

    const updated = { ...answers, [index]: input };
    setAnswers(updated);

    const nextIndex = index + 1;

    if (nextIndex < flows[operation].length) {
      setIndex(nextIndex);

      setTimeout(() => {
        addBot({ text: flows[operation][nextIndex] });
      }, 400);
    } else {
      generateResult(operation);
    }

    setInput("");
  };

  // IMAGE UPLOAD
  const handleImage = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    addUser("📷 Image uploaded successfully", { image: url });

    setTimeout(() => {
      addBot({ text: "Analyzing image..." });
    }, 500);

    setTimeout(() => {
      addBot({ text: "🦠 Disease Detected: Leaf Blight" });
      endFlow();
    }, 1500);
  };

  // RESULT
  const generateResult = (op) => {
    addBot({ text: "Analyzing your inputs..." });

    setTimeout(() => {
      if (op === "crop") {
        addBot({
          text: `🌾 Recommended Crops:
• Rice (89%)
• Wheat (72%)
• Maize (68%)

💰 Best Choice: Rice`,
        });
      } else if (op === "fertilizer") {
        addBot({
          text: "🧪 Recommended Fertilizer: NPK 20-20-20",
        });
      } else {
        addBot({
          text: "📈 Predicted Yield: 3.5 tons/hectare",
        });
      }
    }, 1200);

    setTimeout(() => endFlow(), 2000);
  };

  // END FLOW
  const endFlow = () => {
    setStep("operation");

    setTimeout(() => {
      addBot({ text: "✅ Want to try another?" });

      setTimeout(() => {
        showOperations();
      }, 600);
    }, 300);
  };

  return (
    <Layout>
      <div className="px-6 flex flex-col gap-6">

        {/* BANNER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-teal-400 px-6 py-5 shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-left">
            SmartKrishi AI Assistant 🌱
          </h1>
          <p className="text-green-50/90 mt-1 text-sm text-left">
            Intelligent farming recommendations
          </p>
        </div>

        {/* CHAT */}
        <div className="bg-white rounded-2xl border shadow-sm flex flex-col h-[70vh] overflow-hidden">

          {/* MESSAGES */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-4 py-3 rounded-2xl max-w-md text-sm shadow-sm ${
                    m.type === "user"
                      ? "bg-green-600 text-white rounded-br-md"
                      : "bg-white border rounded-bl-md"
                  }`}
                >
                  <p>{m.text}</p>

                  {m.image && (
                    <img
                      src={m.image}
                      className="mt-2 rounded-lg max-h-40 object-cover"
                    />
                  )}

                  {m.options && (
                    <div className="mt-3 flex flex-col gap-2">
                      {m.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="w-full text-left px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 transition"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.upload && (
                    <label className="mt-3 block border-2 border-dashed border-green-300 p-4 rounded-lg text-center cursor-pointer hover:bg-green-50">
                      Upload Image 📷
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleImage(e.target.files[0])
                        }
                      />
                    </label>
                  )}

                  <span className="text-[10px] opacity-60 block text-right mt-1">
                    {m.time}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="border-t p-3 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Type your answer..."
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 transition text-white px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
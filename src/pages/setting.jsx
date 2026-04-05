import { useState } from "react";
import {
  Bell,
  Lock,
  Phone,
  Info,
  Trash2,
  Star,
  Shield,
  ChevronRight,
  Camera,
} from "lucide-react";
import Layout from "../components/layout";

/* ---------------- MODAL ---------------- */
const Modal = ({ open, title, children, onClose, onSave, danger }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-5 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {children}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Cancel
          </button>

          {onSave && (
            <button
              onClick={onSave}
              className={`w-full text-white py-2 rounded-lg ${
                danger ? "bg-red-500 hover:bg-red-600" : "bg-blue-500"
              }`}
            >
              {danger ? "Delete" : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [modal, setModal] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [rating, setRating] = useState(0);
  const [profilePic, setProfilePic] = useState(
    "https://i.pravatar.cc/100"
  );

  const [form, setForm] = useState({
    name: "Farmer Name",
    email: "farmer@email.com",
    phone: "9876543210",
  });

  const [tempValue, setTempValue] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (["name", "email", "phone"].includes(modal)) {
      if (tempValue.trim() !== "") {
        setForm({ ...form, [modal]: tempValue });
      }
    }
    setTempValue("");
    setModal(null);
  };

  return (
    <Layout>
      <div className="px-6 pt-2 pb-4 bg-gray-50 min-h-screen flex flex-col gap-5">

        {/* ✅ BANNER */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-400 px-6 py-5 shadow-md flex items-center gap-5">

          {/* AVATAR */}
          <label className="relative cursor-pointer flex-shrink-0">
            <input type="file" className="hidden" onChange={handleImageChange} />

            <img
              src={profilePic}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <div className="absolute bottom-1 right-1 bg-black/80 p-1.5 rounded-full">
              <Camera size={14} className="text-white" />
            </div>
          </label>

          {/* ✅ NAME + EMAIL (FIXED SPACING) */}
          <div className="text-white flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl text-white font-bold leading-tight">
              {form.name}
            </h1>

            <span className="text-m md:text-base text-white/80 ">
              {form.email}
            </span>
          </div>

        </div>

        {/* PERSONAL DETAILS */}
        <div className="bg-white rounded-2xl text-left border border-gray-200 overflow-hidden">
          {[
            { label: "Full Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-5 py-4 border-b last:border-none"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">
                  {item.label}
                </span>
                <span className="text-gray-700 font-medium">
                  {form[item.key]}
                </span>
              </div>

              <button
                onClick={() => {
                  setModal(item.key);
                  setTempValue(""); // empty input
                }}
                className="text-blue-600 text-sm flex items-center gap-1"
              >
                Edit <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* SETTINGS LIST */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          {/* NOTIFICATIONS */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Bell size={16} />
              </div>
              <span className="text-gray-700 font-medium">
                Notifications
              </span>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  notifications ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {/* CHANGE PASSWORD */}
          <div
            onClick={() => setModal("password")}
            className="flex items-center justify-between px-5 py-4 border-b cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Lock size={16} />
              </div>
              <span className="text-gray-700 font-medium">
                Change Password
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          {/* RATE US */}
          <div
            onClick={() => setModal("rate")}
            className="flex items-center justify-between px-5 py-4 border-b cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Star size={16} />
              </div>
              <span className="text-gray-700 font-medium">
                Rate Us
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          {/* CONTACT */}
          <div className="flex items-center justify-between px-5 py-4 border-b hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                <Phone size={16} />
              </div>
              <span className="text-gray-700 font-medium">
                Contact Us
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          {/* ABOUT */}
          <div className="flex items-center justify-between px-5 py-4 border-b hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                <Info size={16} />
              </div>
              <span className="text-gray-700 font-medium">
                About Us
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          {/* PRIVACY */}
          <div className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-600">
                <Shield size={16} />
              </div>
              <span className="text-gray-700 font-medium">
                Data & Privacy
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>

        {/* DELETE ACCOUNT */}
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="text-red-500" size={16} />
            </div>
            <div>
              <p className="text-red-600 font-medium">
                Delete Account
              </p>
              <p className="text-xs text-red-400">
                This action is permanent
              </p>
            </div>
          </div>

          <button
            onClick={() => setModal("delete")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* MODALS */}

      {/* EDIT DETAILS */}
      <Modal
        open={["name","email","phone"].includes(modal)}
        title="Edit Details"
        onClose={()=>setModal(null)}
        onSave={handleSave}
      >
        <input
          className="w-full border p-2 rounded-lg"
          placeholder={
            modal === "name"
              ? "Enter name"
              : modal === "email"
              ? "Enter email"
              : "Enter phone number"
          }
          value={tempValue}
          onChange={(e)=>setTempValue(e.target.value)}
        />
      </Modal>

      {/* PASSWORD */}
      <Modal
        open={modal==="password"}
        title="Change Password"
        onClose={()=>setModal(null)}
        onSave={()=>setModal(null)}
      >
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Current password"
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full border p-2 rounded-lg"
          />
        </div>
      </Modal>

      {/* RATE */}
      <Modal
        open={modal==="rate"}
        title="Rate Us"
        onClose={()=>setModal(null)}
        onSave={()=>setModal(null)}
      >
        <div className="flex justify-center gap-2 text-2xl">
          {[1,2,3,4,5].map(i=>(
            <span
              key={i}
              onClick={()=>setRating(i)}
              className={i<=rating?"text-orange-500":"text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
      </Modal>

      {/* DELETE */}
      <Modal
        open={modal==="delete"}
        title="Confirm Delete"
        onClose={()=>setModal(null)}
        onSave={()=>setModal(null)}
        danger
      >
        <p>Are you sure?</p>
      </Modal>

    </Layout>
  );
}
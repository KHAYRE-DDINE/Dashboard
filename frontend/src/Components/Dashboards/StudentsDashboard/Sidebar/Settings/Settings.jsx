import React, { useEffect, useMemo, useState } from "react";
import "./Settings.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TbUser,
  TbBell,
  TbPalette,
  TbShield,
  TbLock,
  TbCamera,
  TbCheck,
  TbMail,
  TbPhone,
  TbWorld,
  TbSun,
  TbMoon,
  TbDeviceDesktop,
  TbEye,
  TbEyeOff,
} from "react-icons/tb";
import avatar from "../../../../../images/avatar.svg";
import axios from "../../../../api/axios";

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-blue-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SectionCard({ title, icon, children, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="settings-card bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5 shadow-sm"
    >
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
          {icon}
        </span>
        <h2 className="font-semibold text-gray-800 text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

function Settings() {
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("user"), []);

  const [profileData, setProfileData] = useState({
    firstName: "Ahmed",
    lastName: "Al Rashid",
    email: "ahmed.rashid@alrihla.com",
    phone: "+966 50 123 4567",
    bio: "Passionate learner exploring the world of knowledge through Al Rihla.",
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    newCourse: true,
    assignmentDue: true,
    messageReceived: true,
    weeklyDigest: false,
    promotions: false,
    systemUpdates: true,
  });

  const [appearance, setAppearance] = useState("light");
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: false,
    allowMessages: true,
  });

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`/users/${userId}`);

        if (!isMounted || !data) return;

        const preferences = data.preferences || {};

        setProfileData((prev) => ({
          ...prev,
          firstName: data.firstName || data["first name"] || prev.firstName,
          lastName: data.lastName || data["last name"] || prev.lastName,
          email: data.email || prev.email,
          phone: data.phone || prev.phone,
          bio: data.bio || prev.bio,
          language: data.language || prev.language,
        }));

        setNotifications((prev) => ({
          ...prev,
          ...(preferences.notifications || {}),
        }));

        setAppearance(preferences.appearance || "light");

        setPrivacy((prev) => ({
          ...prev,
          ...(preferences.privacy || {}),
        }));
      } catch (error) {
        toast.error("Could not load your settings.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const buildPayload = (includePassword = false) => {
    const payload = {
      email: profileData.email,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      "first name": profileData.firstName,
      "last name": profileData.lastName,
      phone: profileData.phone,
      bio: profileData.bio,
      language: profileData.language,
      preferences: {
        notifications,
        appearance,
        privacy,
      },
    };

    if (includePassword) {
      payload.password = passwords.next;
    }

    return payload;
  };

  const handleSave = async () => {
    if (!userId) {
      toast.error("No active user session found. Please log in again.");
      return;
    }

    setSaving(true);
    try {
      await axios.patch(`/users/${userId}`, buildPayload(false));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      toast.success("Settings saved successfully.");
    } catch (error) {
      toast.error("Could not save your settings.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!userId) {
      toast.error("No active user session found. Please log in again.");
      return;
    }

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      toast.warning("Please fill all password fields.");
      return;
    }

    if (passwords.next.length < 8) {
      toast.warning("New password must be at least 8 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      const { data: user } = await axios.get(`/users/${userId}`);
      if (user.password !== passwords.current) {
        toast.error("Current password is incorrect.");
        return;
      }

      await axios.patch(`/users/${userId}`, buildPayload(true));
      setPasswords({ current: "", next: "", confirm: "" });
      toast.success("Password updated successfully.");
    } catch (error) {
      toast.error("Could not update password.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      toast.error("No active user session found. Please log in again.");
      return;
    }

    const shouldDelete = window.confirm(
      "This will permanently delete your account. Do you want to continue?"
    );

    if (!shouldDelete) return;

    setSaving(true);
    try {
      await axios.delete(`/users/${userId}`);
      localStorage.removeItem("user");
      toast.success("Your account has been removed.");
      navigate("/login");
    } catch (error) {
      toast.error("Could not delete your account.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-7"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences and configurations
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving || isLoading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {saved ? <TbCheck size={16} /> : null}
          {isLoading ? "Loading..." : saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </motion.div>

      {/* Profile Section */}
      <SectionCard title="Profile Information" icon={<TbUser size={17} />} index={0}>
        <div className="flex items-start gap-6 mb-6">
          <div className="relative flex-shrink-0">
            <img
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors">
              <TbCamera size={15} />
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Profile Photo</p>
            <p className="text-xs text-gray-400 mt-1 mb-3">
              JPG, PNG or GIF. Max 2MB
            </p>
            <button className="text-xs text-blue-500 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
              Upload new photo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", key: "firstName", icon: <TbUser size={15} /> },
            { label: "Last Name", key: "lastName", icon: <TbUser size={15} /> },
            { label: "Email Address", key: "email", icon: <TbMail size={15} /> },
            { label: "Phone Number", key: "phone", icon: <TbPhone size={15} /> },
          ].map(({ label, key, icon }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {icon}
                </span>
                <input
                  type="text"
                  value={profileData[key]}
                  onChange={(e) =>
                    setProfileData({ ...profileData, [key]: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Bio
            </label>
            <textarea
              rows={3}
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Language
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <TbWorld size={15} />
              </span>
              <select
                value={profileData.language}
                onChange={(e) =>
                  setProfileData({ ...profileData, language: e.target.value })
                }
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 appearance-none bg-white transition-all"
              >
                <option>English</option>
                <option>Arabic</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Notifications Section */}
      <SectionCard title="Notification Preferences" icon={<TbBell size={17} />} index={1}>
        <div className="space-y-4">
          {[
            { key: "newCourse", label: "New Course Available", desc: "Get notified when new courses are added to your program." },
            { key: "assignmentDue", label: "Assignment Due Reminders", desc: "Receive reminders 24h before assignment deadlines." },
            { key: "messageReceived", label: "New Messages", desc: "Alert when a classmate or instructor messages you." },
            { key: "weeklyDigest", label: "Weekly Digest", desc: "A summary of your activity and progress each week." },
            { key: "promotions", label: "Promotions & Offers", desc: "Special offers, discounts and new feature announcements." },
            { key: "systemUpdates", label: "System Updates", desc: "Important platform updates and maintenance notices." },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <Toggle
                checked={notifications[key]}
                onChange={(val) => setNotifications({ ...notifications, [key]: val })}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Appearance Section */}
      <SectionCard title="Appearance" icon={<TbPalette size={17} />} index={2}>
        <p className="text-xs text-gray-400 mb-4">Choose your preferred theme</p>
        <div className="grid grid-cols-3 gap-3 max-w-sm">
          {[
            { key: "light", label: "Light", icon: <TbSun size={20} /> },
            { key: "dark", label: "Dark", icon: <TbMoon size={20} /> },
            { key: "system", label: "System", icon: <TbDeviceDesktop size={20} /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setAppearance(key)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                appearance === key
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {icon}
              <span className="text-xs font-medium">{label}</span>
              {appearance === key && (
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <TbCheck size={10} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Security Section */}
      <SectionCard title="Security" icon={<TbShield size={17} />} index={3}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Current Password
            </label>
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <TbLock size={15} />
              </span>
              <input
                type={showCurrentPw ? "text" : "password"}
                placeholder="Enter current password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, current: e.target.value }))
                }
                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
              <button
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPw ? <TbEyeOff size={15} /> : <TbEye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              New Password
            </label>
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <TbLock size={15} />
              </span>
              <input
                type={showNewPw ? "text" : "password"}
                placeholder="Enter new password"
                value={passwords.next}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, next: e.target.value }))
                }
                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
              <button
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPw ? <TbEyeOff size={15} /> : <TbEye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Confirm New Password
            </label>
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <TbLock size={15} />
              </span>
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                }
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>
          <button
            onClick={handlePasswordUpdate}
            disabled={saving || isLoading}
            className="mt-2 px-5 py-2.5 bg-gray-800 text-white text-sm rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-60"
          >
            Update Password
          </button>
        </div>
      </SectionCard>

      {/* Privacy Section */}
      <SectionCard title="Privacy" icon={<TbEye size={17} />} index={4}>
        <div className="space-y-4">
          {[
            { key: "profileVisible", label: "Public Profile", desc: "Allow others to view your profile and learning activity." },
            { key: "showProgress", label: "Share Progress", desc: "Show your course completion and grades to classmates." },
            { key: "allowMessages", label: "Allow Direct Messages", desc: "Let other students send you private messages." },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <Toggle
                checked={privacy[key]}
                onChange={(val) => setPrivacy({ ...privacy, [key]: val })}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-3">
            Danger Zone
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={saving || isLoading}
            className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            Delete Account
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

export default Settings;

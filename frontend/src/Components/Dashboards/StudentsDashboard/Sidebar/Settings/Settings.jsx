import React, { useEffect, useMemo, useRef, useState } from "react";
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
import defaultAvatar from "../../../../../images/avatar.svg";
import axios from "../../../../api/axios";
import useAuthContext from "../../../../authentication/AuthContext";

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
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-slate-700"
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
      className="settings-card bg-white dark:bg-[#151c2c] rounded-2xl border border-gray-100 dark:border-[#1e293b] overflow-hidden mb-6 shadow-sm"
    >
      <div className="px-6 py-4 border-b border-gray-100 dark:border-[#1e293b] flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          {icon}
        </span>
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

function Settings() {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser, theme, changeTheme } = useAuthContext();
  const userId = useMemo(() => localStorage.getItem("user"), []);
  const avatarFileRef = useRef(null);

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || currentUser?.["first name"] || "Student",
    lastName: currentUser?.lastName || currentUser?.["last name"] || "",
    email: currentUser?.email || "student@altaalim.edu",
    phone: currentUser?.phone || "+212 600-000000",
    bio: currentUser?.bio || "Passionate learner exploring computer science and mathematics at Al Taalim.",
    language: currentUser?.language || "English",
  });

  const [notifications, setNotifications] = useState({
    newCourse: true,
    assignmentDue: true,
    messageReceived: true,
    weeklyDigest: false,
    promotions: false,
    systemUpdates: true,
  });

  const [appearance, setAppearance] = useState(theme || "light");
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: false,
    allowMessages: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        let user = null;
        try {
          const { data } = await axios.get("/users/me");
          user = data?.data || data;
        } catch (e) {
          if (userId) {
            try {
              const { data } = await axios.get(`/users/${userId}`);
              user = data?.data || data;
            } catch (err) {}
          }
        }

        if (!user && currentUser) {
          user = currentUser;
        }

        if (!isMounted || !user) return;

        let preferences = user.preferences || {};
        if (typeof preferences === "string") {
          try {
            preferences = JSON.parse(preferences);
          } catch (e) {
            preferences = {};
          }
        }

        setProfileData((prev) => ({
          ...prev,
          firstName: user.firstName || user["first name"] || prev.firstName,
          lastName: user.lastName || user["last name"] || prev.lastName,
          email: user.email || prev.email,
          phone: user.phone || prev.phone,
          bio: user.bio || prev.bio,
          language: user.language || prev.language,
        }));

        setNotifications((prev) => ({
          ...prev,
          ...(preferences.notifications || {}),
        }));

        setAppearance(preferences.appearance || theme || "light");

        setPrivacy((prev) => ({
          ...prev,
          ...(preferences.privacy || {}),
        }));
      } catch (error) {
        // Silently use session context
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, [userId, currentUser, theme]);

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateCurrentUser({ avatar: reader.result });
        toast.success("Profile photo updated successfully!");
      } catch (error) {
        toast.error("Could not update profile photo.");
      }
    };
    reader.readAsDataURL(file);
  };

  const buildPayload = () => {
    return {
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
      isDarkMode: appearance === "dark"
    };
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCurrentUser(buildPayload());
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
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      toast.warning("Please fill all password fields.");
      return;
    }

    if (passwords.next.length < 6) {
      toast.warning("New password must be at least 6 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      await axios.post("/users/password", {
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });

      setPasswords({ current: "", next: "", confirm: "" });
      toast.success("Password updated successfully.");
    } catch (error) {
      toast.error("Could not update password. Please check your current password.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!shouldDelete) return;

    setSaving(true);
    try {
      await axios.delete("/users/me");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Your account has been removed.");
      navigate("/login");
    } catch (error) {
      toast.error("Could not delete your account.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page min-h-screen bg-gray-50 dark:bg-[#0b0f19] p-4 sm:p-6 lg:p-8 transition-colors">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your account preferences, notifications, and security
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving || isLoading}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
            saved
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
          }`}
        >
          {saved ? <TbCheck size={16} /> : null}
          {isLoading ? "Loading..." : saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </motion.div>

      <div className="max-w-4xl">
        {/* Profile Section */}
        <SectionCard title="Profile Information" icon={<TbUser size={18} />} index={0}>
          <input
            type="file"
            ref={avatarFileRef}
            onChange={handleAvatarSelect}
            accept="image/*"
            className="hidden"
          />
          <div className="flex items-center gap-6 mb-6">
            <div className="relative flex-shrink-0 cursor-pointer" onClick={() => avatarFileRef.current?.click()}>
              <img
                src={currentUser?.avatar || defaultAvatar}
                alt="Avatar"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200 dark:border-slate-700 shadow-sm"
              />
              <button 
                type="button"
                onClick={() => avatarFileRef.current?.click()} 
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors"
              >
                <TbCamera size={14} />
              </button>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Profile Photo</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
                JPG, PNG or GIF. Max 5MB
              </p>
              <button 
                type="button"
                onClick={() => avatarFileRef.current?.click()} 
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Upload new photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "First Name", key: "firstName", icon: <TbUser size={15} /> },
              { label: "Last Name", key: "lastName", icon: <TbUser size={15} /> },
              { label: "Email Address", key: "email", icon: <TbMail size={15} /> },
              { label: "Phone Number", key: "phone", icon: <TbPhone size={15} /> },
            ].map(({ label, key, icon }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    {icon}
                  </span>
                  <input
                    type="text"
                    value={profileData[key]}
                    onChange={(e) =>
                      setProfileData({ ...profileData, [key]: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-[#1e293b] rounded-xl text-sm bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Bio
              </label>
              <textarea
                rows={3}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-[#1e293b] rounded-xl text-sm bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Language
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <TbWorld size={15} />
                </span>
                <select
                  value={profileData.language}
                  onChange={(e) =>
                    setProfileData({ ...profileData, language: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-[#1e293b] rounded-xl text-sm bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none transition-all cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Arabic">Arabic (العربية)</option>
                  <option value="French">French (Français)</option>
                  <option value="Spanish">Spanish (Español)</option>
                </select>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Notifications Section */}
        <SectionCard title="Notification Preferences" icon={<TbBell size={18} />} index={1}>
          <div className="space-y-4">
            {[
              { key: "newCourse", label: "New Course Available", desc: "Get notified when new courses or tracks are added to your curriculum." },
              { key: "assignmentDue", label: "Assignment Due Reminders", desc: "Receive reminders 24h before assignment deadlines." },
              { key: "messageReceived", label: "New Messages", desc: "Alert when a classmate or teacher messages you." },
              { key: "weeklyDigest", label: "Weekly Digest", desc: "A summary of your academic activity and progress each week." },
              { key: "promotions", label: "Promotions & Offers", desc: "Special offers and platform feature announcements." },
              { key: "systemUpdates", label: "System Updates", desc: "Important platform updates and maintenance notices." },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-[#1e293b] last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
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
        <SectionCard title="Appearance" icon={<TbPalette size={18} />} index={2}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Choose your preferred application theme</p>
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            {[
              { key: "light", label: "Light", icon: <TbSun size={20} /> },
              { key: "dark", label: "Dark", icon: <TbMoon size={20} /> },
              { key: "system", label: "System", icon: <TbDeviceDesktop size={20} /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setAppearance(key);
                  changeTheme(key);
                  toast.success(`Theme set to ${label}`);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  (appearance || theme) === key
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-500"
                    : "border-gray-200 bg-gray-50 dark:bg-[#0b0f19] text-gray-600 dark:text-gray-400 dark:border-[#1e293b] hover:bg-gray-100 dark:hover:bg-[#1e293b]/70"
                }`}
              >
                {icon}
                <span className="text-xs font-semibold">{label}</span>
                {(appearance || theme) === key && (
                  <span className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                    <TbCheck size={10} className="text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Security Section */}
        <SectionCard title="Security & Credentials" icon={<TbShield size={18} />} index={3}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Current Password
              </label>
              <div className="relative max-w-md">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <TbLock size={15} />
                </span>
                <input
                  type={showCurrentPw ? "text" : "password"}
                  placeholder="Enter current password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, current: e.target.value }))
                  }
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-[#1e293b] rounded-xl text-sm bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showCurrentPw ? <TbEyeOff size={16} /> : <TbEye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                New Password
              </label>
              <div className="relative max-w-md">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <TbLock size={15} />
                </span>
                <input
                  type={showNewPw ? "text" : "password"}
                  placeholder="Enter new password (min 6 chars)"
                  value={passwords.next}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, next: e.target.value }))
                  }
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-[#1e293b] rounded-xl text-sm bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showNewPw ? <TbEyeOff size={16} /> : <TbEye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Confirm New Password
              </label>
              <div className="relative max-w-md">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <TbLock size={15} />
                </span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-[#1e293b] rounded-xl text-sm bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePasswordUpdate}
              disabled={saving || isLoading}
              className="mt-2 px-5 py-2.5 bg-gray-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white text-sm rounded-xl font-semibold transition-colors disabled:opacity-60"
            >
              Update Password
            </button>
          </div>
        </SectionCard>

        {/* Privacy Section */}
        <SectionCard title="Privacy & Security" icon={<TbEye size={18} />} index={4}>
          <div className="space-y-4">
            {[
              { key: "profileVisible", label: "Public Profile", desc: "Allow classmates and teachers to view your profile and enrolled courses." },
              { key: "showProgress", label: "Share Progress", desc: "Show your course completion milestones on leaderboards." },
              { key: "allowMessages", label: "Allow Direct Messages", desc: "Let cohort students initiate direct chat conversations." },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-[#1e293b] last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Toggle
                  checked={privacy[key]}
                  onChange={(val) => setPrivacy({ ...privacy, [key]: val })}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#1e293b]">
            <p className="text-xs font-bold text-rose-500 uppercase tracking-wide mb-2">
              Danger Zone
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Permanently delete your student account and all enrolled progress.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={saving || isLoading}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 px-4 py-2 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors disabled:opacity-60"
            >
              Delete Account
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default Settings;

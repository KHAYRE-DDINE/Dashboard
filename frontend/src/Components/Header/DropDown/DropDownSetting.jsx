import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TbSettings,
  TbPalette,
  TbBell,
  TbShield,
  TbWorld,
  TbKeyboard,
  TbSun,
  TbMoon,
  TbChevronRight,
} from "react-icons/tb";
import settings from "../../../images/settings.svg";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const quickLinks = [
  {
    icon: <TbPalette size={15} />,
    label: "Appearance",
    desc: "Theme & display",
    color: "text-purple-500",
    bg: "bg-purple-50",
    path: "dashboard/settings",
  },
  {
    icon: <TbBell size={15} />,
    label: "Notifications",
    desc: "Alerts & emails",
    color: "text-blue-500",
    bg: "bg-blue-50",
    path: "dashboard/settings",
  },
  {
    icon: <TbShield size={15} />,
    label: "Security",
    desc: "Password & 2FA",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    path: "dashboard/settings",
  },
  {
    icon: <TbWorld size={15} />,
    label: "Language",
    desc: "English (EN)",
    color: "text-orange-500",
    bg: "bg-orange-50",
    path: "dashboard/settings",
  },
  {
    icon: <TbKeyboard size={15} />,
    label: "Shortcuts",
    desc: "Keyboard shortcuts",
    color: "text-gray-500",
    bg: "bg-gray-100",
    path: "dashboard/settings",
  },
];

export default function DropDownSetting() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const userId = useMemo(() => localStorage.getItem("user"), []);

  useEffect(() => {
    let isMounted = true;

    const loadAppearance = async () => {
      if (!userId) return;

      try {
        const { data } = await axios.get(`/users/${userId}`);
        const appearance = data?.preferences?.appearance;

        if (isMounted) {
          setDarkMode(appearance === "dark");
        }
      } catch (error) {
        // Keep default mode if settings cannot be loaded.
      }
    };

    loadAppearance();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleToggleDarkMode = async () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);

    if (!userId) {
      return;
    }

    try {
      const { data: user } = await axios.get(`/users/${userId}`);
      const preferences = user?.preferences || {};

      await axios.patch(`/users/${userId}`, {
        preferences: {
          ...preferences,
          appearance: nextDarkMode ? "dark" : "light",
        },
      });
    } catch (error) {
      setDarkMode(!nextDarkMode);
      toast.error("Could not update appearance setting.");
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 transition-all">
          <img src={settings} alt="settings" className="w-5 h-5" />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95 translate-y-1"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 z-[9999] mt-3 w-64 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <TbSettings size={16} className="text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm">
              Quick Settings
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? (
                <TbMoon size={16} className="text-indigo-500" />
              ) : (
                <TbSun size={16} className="text-amber-500" />
              )}
              <span className="text-sm text-gray-700 font-medium">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <button
              onClick={handleToggleDarkMode}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                darkMode ? "bg-indigo-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Quick Links */}
          <div className="py-2">
            {quickLinks.map((item, i) => (
              <MenuItem key={i}>
                {({ focus }) => (
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
                      focus ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                    <TbChevronRight size={14} className="text-gray-300" />
                  </button>
                )}
              </MenuItem>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              onClick={() => navigate("dashboard/settings")}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-xl font-semibold transition-colors"
            >
              All Settings
            </button>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

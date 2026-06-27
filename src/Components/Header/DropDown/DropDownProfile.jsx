import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  TbUser,
  TbSettings,
  TbBook,
  TbHelp,
  TbLogout,
  TbChevronRight,
  TbStar,
  TbBadge,
} from "react-icons/tb";
import avatar from "../../../images/avatar.svg";
import useAuthContext from "../../authentication/AuthContext";

const menuItems = [
  {
    icon: <TbUser size={15} />,
    label: "My Profile",
    desc: "View & edit profile",
    color: "text-blue-500",
    bg: "bg-blue-50",
    path: "dashboard/account",
  },
  {
    icon: <TbSettings size={15} />,
    label: "Settings",
    desc: "Preferences & security",
    color: "text-gray-500",
    bg: "bg-gray-100",
    path: "dashboard/settings",
  },
  {
    icon: <TbBook size={15} />,
    label: "My Library",
    desc: "Saved resources",
    color: "text-purple-500",
    bg: "bg-purple-50",
    path: "dashboard/library",
  },
  {
    icon: <TbHelp size={15} />,
    label: "Help & Support",
    desc: "FAQs & contact",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    path: "dashboard/help",
  },
];

export default function DropDownProfile() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center justify-center rounded-xl hover:ring-2 hover:ring-blue-200 transition-all">
          <img
            src={avatar}
            alt="avatar"
            className="w-9 h-9 rounded-xl object-cover border-2 border-gray-100"
          />
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
        <MenuItems className="absolute right-0 z-[9999] mt-3 w-64 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden">
          {/* User Info Header */}
          <div
            className="px-4 py-4 border-b border-gray-100"
            style={{ background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  Ahmed Al Rashid
                </p>
                <p className="text-xs text-gray-500 truncate">
                  ahmed.rashid@alrihla.com
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TbStar size={11} className="text-amber-400" />
                  <span className="text-[10px] text-amber-500 font-medium">
                    Premium Member
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-500 font-medium">
                  Profile completion
                </span>
                <span className="text-[10px] text-blue-500 font-bold">78%</span>
              </div>
              <div className="h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, i) => (
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

          {/* Sign Out */}
          <div className="px-3 py-3 border-t border-gray-100">
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={logout}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 transition-colors ${
                    focus ? "bg-red-50" : "hover:bg-red-50"
                  }`}
                >
                  <TbLogout size={16} />
                  Sign Out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

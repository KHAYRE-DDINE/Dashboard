import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { motion } from "framer-motion";
import {
  TbBell,
  TbBellFilled,
  TbCheck,
  TbTrophy,
  TbUserCheck,
  TbMail,
  TbAlertCircle,
  TbX,
} from "react-icons/tb";
import avatar from "../../../images/avatar.svg";
import notification from "../../../images/notification.svg";

const initialNotifications = [
  {
    id: 1,
    type: "achievement",
    icon: <TbTrophy size={16} />,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Congratulation Lettie 🎉",
    body: "Won the monthly best seller gold badge",
    time: "1h ago",
    read: false,
    avatar: avatar,
  },
  {
    id: 2,
    type: "connection",
    icon: <TbUserCheck size={16} />,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Charles Franklin",
    body: "Accepted your connection request",
    time: "12h ago",
    read: false,
    avatar: avatar,
  },
  {
    id: 3,
    type: "message",
    icon: <TbMail size={16} />,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "New Message ✉️",
    body: "You have a new message from Natalie",
    time: "30min ago",
    read: true,
    avatar: avatar,
  },
  {
    id: 4,
    type: "alert",
    icon: <TbAlertCircle size={16} />,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "Assignment Due Soon",
    body: "Math assignment is due in 2 hours",
    time: "2h ago",
    read: true,
    avatar: null,
  },
];

export default function DropDownNotification() {
  const [notes, setNotes] = useState(initialNotifications);
  const unread = notes.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotes((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  const markRead = (id) =>
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 transition-all">
          <img src={notification} alt="notification" className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
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
        <MenuItems className="absolute right-[-60px] z-[9999] mt-3 w-84 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden" style={{ width: "340px" }}>
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TbBellFilled size={17} className="text-blue-500" />
              <span className="font-semibold text-gray-800 text-sm">Notifications</span>
              {unread > 0 && (
                <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unread}
                </span>
              )}
            </div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                <TbCheck size={13} /> Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[340px] overflow-y-auto">
            {notes.length === 0 ? (
              <div className="py-10 text-center text-gray-400">
                <TbBell size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              notes.map((n) => (
                <MenuItem key={n.id}>
                  {({ focus }) => (
                    <div
                      onClick={() => markRead(n.id)}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors relative group ${
                        focus ? "bg-gray-50" : ""
                      } ${!n.read ? "bg-blue-50/40" : "bg-white"}`}
                    >
                      {/* Avatar or Icon */}
                      <div className="relative flex-shrink-0">
                        {n.avatar ? (
                          <img
                            src={n.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-9 h-9 rounded-full ${n.iconBg} ${n.iconColor} flex items-center justify-center`}>
                            {n.icon}
                          </div>
                        )}
                        {!n.read && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${!n.read ? "font-semibold text-gray-800" : "font-medium text-gray-700"}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed truncate">
                          {n.body}
                        </p>
                        <span className="text-[11px] text-gray-400 mt-1 block">{n.time}</span>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all flex-shrink-0 mt-0.5"
                      >
                        <TbX size={14} />
                      </button>
                    </div>
                  )}
                </MenuItem>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 text-center">
            <button className="text-xs text-blue-500 font-medium hover:underline">
              View all notifications
            </button>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

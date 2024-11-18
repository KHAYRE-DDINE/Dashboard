import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import notification from "../../../images/notification.svg";
import avatar from "../../../images/avatar.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50">
          <img src={notification} alt="notification" />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-[-50px] z-10 mt-6 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button
            className={classNames(
              "py-3 px-3 text-gray-700 cursor-text w-full text-start h-10 border-b-[2px] border-[#ccc] border-solid"
            )}
          >
            Notifications
          </button>
          <div className="py-3 px-3 hover:bg-gray-100 hover:text-gray-900">
            <MenuItem>
              {({ focus }) => (
                <div className="notify flex items-center justify-start gap-3">
                  <div className="image">
                    <img src={avatar} alt="avatar" />
                  </div>
                  <div className="info leading-[1]">
                    <h1 className="notification-title py-1 font-['Inter'] font-[500] tracking-[-0.4px] text-[15px]">
                      Congratulation Lettie 🎉
                    </h1>
                    <p className="content text-[14px] my-[5px] text-[#595962]">
                      Won the monthly best seller gold badge
                    </p>
                    <span className="date text-[13px] text-[#7e7f96]">
                      1h ago
                    </span>
                  </div>
                </div>
              )}
            </MenuItem>
          </div>
          <div className="py-3 px-3 hover:bg-[#cccccc3d]">
            <MenuItem>
              {({ focus }) => (
                <div className="notify flex items-center justify-start gap-3">
                  <div className="image">
                    <img src={avatar} alt="avatar" />
                  </div>
                  <div className="info leading-[1]">
                    <h1 className="notification-title py-1 font-['Inter'] font-[500] tracking-[-0.4px] text-[15px]">
                      Charles Franklin{" "}
                    </h1>
                    <p className="content text-[14px] my-[5px] text-[#595962]">
                      Accepted your connection
                    </p>
                    <span className="date text-[13px] text-[#7e7f96]">
                      12h ago
                    </span>
                  </div>
                </div>
              )}
            </MenuItem>
          </div>
          <div className="py-3 px-3 hover:bg-[#cccccc3d]">
            <MenuItem>
              {({ focus }) => (
                <div className="notify flex items-center justify-start gap-3">
                  <div className="image">
                    <img src={avatar} alt="avatar" />
                  </div>
                  <div className="info leading-[1]">
                    <h1 className="notification-title py-1 font-['Inter'] font-[500] tracking-[-0.4px] text-[15px]">
                      New Message ✉️
                    </h1>
                    <p className="content text-[14px] my-[5px] text-[#595962]">
                      You have new message from Natalie
                    </p>
                    <span className="date text-[13px] text-[#7e7f96]">
                      30min ago
                    </span>
                  </div>
                </div>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

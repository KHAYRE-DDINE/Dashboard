import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import avatar from "../../../images/avatar.svg";
import useAuthContext from "../../authentication/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 border-none hover:bg-gray-50">
          <img src={avatar} alt="avatar" />
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            <button
              className={classNames(
                "py-3 px-3 text-gray-700 cursor-text w-full text-start h-10 border-b-[2px] border-[#ccc] border-solid"
              )}
            >
              Account Settings
            </button>
            <MenuItem>
              {({ focus }) => (
                <button
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "py-3 px-3 hover:bg-[#cccccc3d] w-full text-start h-10"
                  )}
                >
                  Support
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <button
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "py-3 px-3 hover:bg-[#cccccc3d] w-full text-start h-10"
                  )}
                >
                  License
                </button>
              )}
            </MenuItem>
            <form method="POST" action="#">
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="submit"
                    className={classNames(
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "py-3 px-3 hover:bg-[#cccccc3d] w-full text-start h-10"
                    )}
                    onClick={() => handleLogout()}
                  >
                    Sign out
                  </button>
                )}
              </MenuItem>
            </form>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

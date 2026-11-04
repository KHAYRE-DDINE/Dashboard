import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900   ring-gray-300 hover:bg-gray-50">
          <BsThreeDotsVertical />
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
        <MenuItems className="list-item absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 px-4 cursor-pointer hover:bg-[#a0a0a061] ">
            <MenuItem>{({ focus }) => <span>view contact</span>}</MenuItem>
          </div>
          <div className="py-2 px-4 cursor-pointer hover:bg-[#a0a0a061] ">
            <MenuItem>
              {({ focus }) => <span>mute notifications</span>}
            </MenuItem>
          </div>
          <div className="py-2 px-4 cursor-pointer hover:bg-[#a0a0a061] ">
            <MenuItem>{({ focus }) => <span>block contact</span>}</MenuItem>
          </div>
          <div className="py-2 px-4 cursor-pointer hover:bg-[#a0a0a061] ">
            <MenuItem>{({ focus }) => <span>clear chat</span>}</MenuItem>
          </div>
          <div className="py-2 px-4 cursor-pointer hover:bg-[#a0a0a061] ">
            <MenuItem>{({ focus }) => <span>report</span>}</MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

import React from "react";
import "flowbite/dist/flowbite.css";
import "flowbite";
import AvatarDropdown from "./AvatarDropdown";
import logo from "../assets/logo.png"

const Navbar = ({ user }) => {
  return (
    <div>
      <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10" alt=""/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TaskTracker
            </span>
          </a>
          <AvatarDropdown user={user} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

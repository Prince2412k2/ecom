'use client'
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      console.log("Logged out");
      router.replace("/login"); // redirect user after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="relative ml-4 flex-shrink-0">
      <div>
        <button
          type="button"
          className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          id="user-menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            height={500}
            width={500}
            src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt=""
          />
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

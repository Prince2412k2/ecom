"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiBox } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  userType: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: FiHome, show: user?.userType === 'Admin' || user?.userType === 'Super' },
    { href: "/admins", label: "Admins", icon: FiUsers, show: user?.userType === "Super" },
    { href: "/products", label: "Products", icon: FiBox, show: user?.userType === 'Admin' || user?.userType === 'Super' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-gray-800">Admin Panel</div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) =>
              item.show && (
                <li key={item.href}>
                  <Link
                    href={`/admin${item.href}`}
                    className={`flex items-center px-6 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors ${pathname === `/admin${item.href}` ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : ""}`}>
                    <item.icon className="w-6 h-6 mr-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 bg-white border-b">
          <div></div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

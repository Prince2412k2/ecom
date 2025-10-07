'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDollarSign, FiShoppingCart, FiUsers } from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "$0", icon: FiDollarSign, color: "bg-blue-500" },
    { title: "Total Orders", value: "0", icon: FiShoppingCart, color: "bg-green-500" },
    { title: "Total Customers", value: "0", icon: FiUsers, color: "bg-yellow-500" },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('/api/dashboard');
        setStats([
          { title: "Total Sales", value: `$${data.totalSales.toLocaleString()}`, icon: FiDollarSign, color: "bg-blue-500" },
          { title: "Total Orders", value: data.totalOrders.toLocaleString(), icon: FiShoppingCart, color: "bg-green-500" },
          { title: "Total Customers", value: isNaN(data.totalCustomers) ? 'N/A' : data.totalCustomers.toLocaleString(), icon: FiUsers, color: "bg-yellow-500" },
        ]);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 mb-8">Welcome to the admin dashboard. Here you can manage products, view sales, and more.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className={`p-4 rounded-full text-white ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
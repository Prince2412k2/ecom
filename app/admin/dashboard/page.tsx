"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDollarSign, FiShoppingCart, FiUsers } from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "$0", icon: FiDollarSign },
    { title: "Total Orders", value: "0", icon: FiShoppingCart },
    { title: "Total Customers", value: "0", icon: FiUsers },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('/api/dashboard');
        setStats([
          { title: "Total Sales", value: `$${data.totalSales.toLocaleString()}`, icon: FiDollarSign },
          { title: "Total Orders", value: data.totalOrders.toLocaleString(), icon: FiShoppingCart },
          { title: "Total Customers", value: isNaN(data.totalCustomers) ? 'N/A' : data.totalCustomers.toLocaleString(), icon: FiUsers },
        ]);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to the admin dashboard. Here you can manage products, view sales, and more.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

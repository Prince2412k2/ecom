'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Admin {
  _id: string;
  name: string;
  email: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get('/api/admins');
        setAdmins(data);
      } catch (error) {
        console.error('Failed to fetch admins', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admins', { name, email, password });
      setAdmins([...admins, data]);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Failed to create admin', error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Manage Admins
        </h1>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={admin._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{admin.name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{admin.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Create New Admin</h2>
          <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleCreateAdmin}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
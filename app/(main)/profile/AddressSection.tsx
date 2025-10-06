"use client";
import { useState } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

interface AddressSectionProps {
  initialAddresses: string[];
}

export default function AddressSection({ initialAddresses }: AddressSectionProps) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [newAddress, setNewAddress] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/addresses', { address: newAddress });
      setAddresses(data);
      setNewAddress('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add address', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Addresses</h2>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <FiPlus />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <p className="text-gray-700">{address}</p>
          </div>
        ))}
      </div>
      {isAdding && (
        <form onSubmit={handleAddAddress} className="mt-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Enter new address"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  addedAt: string;
  lastSale?: string;
  sold: number;
  onSale: boolean;
  discount: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<{ userType: string } | null>(null);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Products
          </h1>
          <Link href="/admin/products/create" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors">
            Create Product
          </Link>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    On Sale
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-gray-900" title={product.title}>
                        {product.title}
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">${product.price}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{product.discount}%</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${product.onSale ? 'text-green-900' : 'text-red-900'}`}>
                        <span aria-hidden className={`absolute inset-0 ${product.onSale ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                        <span className="relative">{product.onSale ? 'Yes' : 'No'}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{product.quantity}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm text-right">
                      <div className="flex justify-end">
                        {user?.userType === 'Admin' && (
                          <Link href={`/admin/products/edit/${product._id}`} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                            Edit
                          </Link>
                        )}
                        {(user?.userType === 'Admin' || user?.userType === 'Super') && (
                          <button onClick={() => handleDelete(product._id)} className="text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2">
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
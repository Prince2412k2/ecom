"use client";
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
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Products</h1>
        <Link href="/admin/products/create" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors">
          Create Product
        </Link>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
        <div className="inline-block min-w-full shadow-2xl rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Discount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">On Sale</th>
                <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Added At</th>
                <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Last Sale</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Stock</th>
                <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Sold</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-gray-900 font-medium">{product.title}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-gray-800">${product.price}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-gray-800">{product.discount}%</p></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.onSale ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.onSale ? 'Yes' : 'No'}</span></td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap"><p className="text-gray-600">{new Date(product.addedAt).toLocaleDateString()}</p></td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap"><p className="text-gray-600">{product.lastSale ? new Date(product.lastSale).toLocaleDateString() : 'N/A'}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-gray-800">{product.quantity}</p></td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap"><p className="text-gray-800">{product.sold}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



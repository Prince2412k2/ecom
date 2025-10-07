'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

interface Product {
  title: string;
  price: number;
  discount: number;
  onSale: boolean;
  quantity: number;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/api/products/${id}`);
          setProduct(data);
        } catch (error) {
          console.error('Failed to fetch product', error);
          setError('Failed to fetch product');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setError(null);
    setLoading(true);

    try {
      await axios.put(`/api/products/${id}`, product);
      router.push('/admin/products');
    } catch {
      setError('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Product
        </h1>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  type="text"
                  value={product.title}
                  onChange={(e) => setProduct({ ...product, title: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  id="price"
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                <input
                  id="discount"
                  type="number"
                  value={product.discount}
                  onChange={(e) => setProduct({ ...product, discount: Number(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  id="quantity"
                  type="number"
                  value={product.quantity}
                  onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="onSale"
                  type="checkbox"
                  checked={product.onSale}
                  onChange={(e) => setProduct({ ...product, onSale: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="onSale" className="ml-2 block text-sm text-gray-900">On Sale</label>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
            <div className="mt-6">
              <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

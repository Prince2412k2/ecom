
import { getProductById } from "@/lib/products/getProductById";
import Image from "next/image";



export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return (<div>Error</div>)

  const finalPrice = product.onSale
    ? product.price - (product.price * (product.discount ?? 0)) / 100
    : product.price;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-contain border"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 text-sm uppercase">{product.category}</p>
        <p className="text-gray-700">Brand: {product.brand}</p>
        {product.model && <p className="text-gray-700">Model: {product.model}</p>}
        {product.color && <p className="text-gray-700">Color: {product.color}</p>}

        {/* Price Section */}
        <div className="mt-4">
          {product.onSale ? (
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold text-red-500">
                ${finalPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-500">${product.price}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm">
                -{product.discount}%
              </span>
            </div>
          ) : (
            <p className="text-xl font-semibold">${product.price}</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <button className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button className="px-5 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 transition">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}


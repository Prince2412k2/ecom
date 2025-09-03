import { getProductById } from "@/lib/products/getProductById";
import { getProductsByCate } from "@/lib/products/getProductsByCategory";
import Image from "next/image";
import ItemsButton from "./itemsButton";
import Link from "next/link";


export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return (<div>Error</div>);

  const relatedProducts = await getProductsByCate(product.category);
  if (!relatedProducts) return (<div>Error</div>);

  const finalPrice = product.onSale
    ? product.price - (product.price * (product.discount ?? 0)) / 100
    : product.price;

  return (
    <div className="bg-white font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="flex justify-center items-start">
            <div className="w-full max-w-lg bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={800}
                height={800}
                className="w-full h-full rounded-2xl object-contain "
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{product.category}</p>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 mt-2">{product.title}</h1>
            </div>

            {/* Price Section */}
            <div className="mt-2">
              {product.onSale ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl line-through text-gray-400">${product.price}</span>
                </div>
              ) : (
                <p className="text-4xl font-bold text-gray-900">${product.price}</p>
              )}
            </div>

            <div className="space-y-4 text-gray-600">
              <p><span className="font-medium text-gray-800">Brand:</span> {product.brand}</p>
              {product.model && <p><span className="font-medium text-gray-800">Model:</span> {product.model}</p>}
              {product.color && <p><span className="font-medium text-gray-800">Color:</span> {product.color}</p>}
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center">
              <div className="flex items-center">
                <ItemsButton _id={id} max={product.quantity} defaultItems={1} />
              </div>
            </div>

          </div>
        </div>
        {/* filter(prod => prod._id !== product._id). */}
        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">You might also like</h2>
          <div className="mt-8 grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* //).map((relatedProduct) => ( */}
            {relatedProducts
              .filter((item) => item._id.toHexString() !== product._id.toHexString()) // only keep "other" products
              .map((relatedProduct) => (
                <div key={String(relatedProduct._id)} className="group shadow-md rounded-2xl text-center">
                  <div className="w-full bg-gray-100 rounded-2xl overflow-hidden">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      width={400}
                      height={400}
                      className="pointer-events-none w-full h-full object-contain  group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-medium text-gray-800">
                      <Link href={`/products/${relatedProduct._id}`}>
                        {relatedProduct.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-base text-gray-500">
                      ${relatedProduct.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main >
    </div >
  );
}


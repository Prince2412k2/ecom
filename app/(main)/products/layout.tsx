import { getCategories } from "@/lib/category/getCategory";
import Link from "next/link";


export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()
  if (!categories) { return <div className="overscroll-none">Error</div> }
  return (
    <section>
      <nav className="bg-white pt-20 shadow-black shadow-md z-1 overflow-hidden">
        <div className="flex">
          <div className="flex space-x-4 overflow-x-auto">
            <Link
              key="all"
              href={`/products`}
              className="px-3 py-2 rounded-md text-sm text-gray-600 font-bold hover:text-black hover:shadow-2xl"
            >
              All
            </Link>

            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products/category/${category.name}`}
                className="px-3 py-2 rounded-md text-sm text-gray-600 font-bold hover:text-black hover:shadow-2xl"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {children}
    </section>
  )
}

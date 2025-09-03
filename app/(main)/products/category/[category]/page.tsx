import ProductGrid from "@/app/(main)/Components/ProductGrid"
export default async function CategoryGrid({
  params,
}: {
  params: { category: string }
}) {
  const { category } = await params

  return <ProductGrid category={category} />
}


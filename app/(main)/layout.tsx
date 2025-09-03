import { Navbar } from "./Components/Navbar"

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}

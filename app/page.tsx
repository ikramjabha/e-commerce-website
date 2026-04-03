import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ArrivalInfos from "./components/ArrivalInfos";
import TopSales from "./components/TopSales";
import ProductsGrid from "./components/ProductsGrid";
import Footer from "./components/Footer";
import { getProducts } from "@/lib/airtable";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen js-triggerer">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <HeroSection />
        <ArrivalInfos />
        <TopSales topProducts={products.slice(0, 3)} />
        <ProductsGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}

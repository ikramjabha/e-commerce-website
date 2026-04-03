import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ArrivalInfos from "./components/ArrivalInfos";
import TopSales from "./components/TopSales";
import ProductsGrid from "./components/ProductsGrid";
import Footer from "./components/Footer";

async function getProducts() {
  try {
    const res = await fetch("https://api.airtable.com/v0/appPNGhHIntf8vSoG/tbl2V5avQ8IhreFq7", {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`
      },
      next: { revalidate: 10 }
    });

    if (!res.ok) {
      console.error("Failed to fetch from Airtable");
      return [];
    }

    const data = await res.json();
    return data.records.map((record: any) => {
      const fields = record.fields;
      const imageUrl = fields["Product Image"]?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80";

      return {
        id: record.id,
        name: fields["Product Name"] || " بدون اسم",
        price: fields["Price"] ? `${fields["Price"]} درهم` : "السعر غير متوفر",
        image: imageUrl,
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
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

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProducts, productPath, type Product } from "@/lib/airtable";

const ITEMS_PER_PAGE = 9;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata = {
  title: "المنتجات | متجرنا",
  description: "تصفح جميع منتجاتنا",
};

export default async function ProductsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const allProducts = await getProducts();

  const totalPages = Math.max(1, Math.ceil(allProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, parseInt(pageParam || "1", 10)), totalPages);
  const products = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900">جميع المنتجات</h2>
              <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
              <p className="text-zinc-500 text-sm font-medium">
                {allProducts.length} منتج — صفحة {currentPage} من {totalPages}
              </p>
            </div>

            {products.length === 0 ? (
              <p className="text-center text-xl text-zinc-400 font-medium py-20">
                عذراً، لا توجد منتجات متاحة حالياً.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {products.map((product: Product) => (
                  <div key={product.id} className="group flex flex-col">
                    <Link
                      href={productPath(product)}
                      className="block relative aspect-[4/5] overflow-hidden bg-zinc-100 rounded-3xl mb-6 shadow-sm border border-zinc-100"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </Link>
                    <div className="flex flex-col items-center text-center gap-2 px-1">
                      <Link href={productPath(product)} className="hover:opacity-80 transition-opacity">
                        <h4 className="text-lg font-bold text-zinc-900 line-clamp-1">{product.name}</h4>
                      </Link>
                      <p className="text-xl font-black text-zinc-600">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link
                    href={`/products?page=${currentPage - 1}`}
                    className="px-5 py-2.5 rounded-full border border-zinc-200 text-sm font-bold text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    السابق
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/products?page=${p}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      p === currentPage
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {p}
                  </Link>
                ))}

                {currentPage < totalPages && (
                  <Link
                    href={`/products?page=${currentPage + 1}`}
                    className="px-5 py-2.5 rounded-full border border-zinc-200 text-sm font-bold text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    التالي
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

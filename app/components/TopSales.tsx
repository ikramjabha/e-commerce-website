import Image from "next/image";
import Link from "next/link";
import { productPath, type Product } from "@/lib/airtable";

export default function TopSales({ topProducts }: { topProducts: Product[] }) {
  if (!topProducts || topProducts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900">الأكثر طلباً هذا الأسبوع</h2>
          </div>
          <button className="text-zinc-500 font-bold hover:text-zinc-900 transition-colors flex items-center gap-2 group">
            عرض الكل
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topProducts.map((item) => (
            <Link
              key={item.id}
              href={productPath(item)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-100 block"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-zinc-900 shadow-sm">
                    حصري
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">{item.name}</h4>
                  <p className="text-lg font-bold text-white/80">{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

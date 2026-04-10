"use client";

import Image from "next/image";
import Link from "next/link";
import { productPath, type Product } from "@/lib/airtable";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section id="products" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900">اكتشف أحدث الموديلات</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full"></div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-zinc-400 font-medium">عذراً، لا توجد منتجات متاحة حالياً.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 overflow-x-auto pt-4 pb-12 w-full">
              {products.map((product, index) => (
                <div key={product.id} className="group shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] flex flex-col">
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  </Link>

                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex flex-col items-center text-center mb-6 gap-2">
                      <Link href={productPath(product)} className="hover:opacity-80 transition-opacity">
                        <h4 className="text-lg font-bold text-zinc-900 line-clamp-1">{product.name}</h4>
                      </Link>
                      <p className="text-xl font-black text-zinc-600">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

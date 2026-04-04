"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { productPath } from "@/lib/airtable";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
};

export default function ProductsGrid({ products }: { products: Product[] }) {
  const whatsappNumber = "212600000000";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const scrollProgress = Math.abs(scrollLeft / (scrollWidth - clientWidth));
    const newIndex = Math.round(scrollProgress * (products.length - 1));
    setActiveIndex(newIndex || 0);
  };

  const getVisibleItemsCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const targetElement = container.children[index];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const step = getVisibleItemsCount();
    if (activeIndex < products.length - 1) {
      scrollTo(Math.min(activeIndex + step, products.length - 1));
    }
  };

  const handlePrev = () => {
    const step = getVisibleItemsCount();
    if (activeIndex > 0) {
      scrollTo(Math.max(activeIndex - step, 0));
    }
  };

  return (
    <section id="products" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900">اكتشف أحدث الموديلات</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-zinc-400 font-medium">عذراً، لا توجد منتجات متاحة حالياً.</p>
          </div>
        ) : (
          <div className="relative group">
            
            {/* The Scrolling Container without negative bleeding to ensure strict 3-item math */}
            <div 
              ref={scrollContainerRef}
              onScroll={onScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-4 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth w-full"
            >
              {products.map((product, index) => (
                <div key={product.id} className="group shrink-0 w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] snap-start flex flex-col">
                  <Link
                    href={productPath(product)}
                    className="block relative aspect-[4/5] overflow-hidden bg-zinc-100 rounded-3xl mb-6 shadow-sm border border-zinc-100"
                  >
                    <Image
                      src={product.image}
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
                    
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود طلب المنتج التالي: ${product.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold py-3.5 px-4 rounded-full transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-1 shadow-md shadow-zinc-900/10"
                    >
                      اطلب عبر واتساب
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Edge-Floating Navigation Arrows (Hidden on Mobile as swipe is natural) */}
            <div className="hidden md:block">
               {/* Left Arrow (Next in RTL) pushed further out */}
              <button 
                onClick={handleNext}
                disabled={activeIndex >= products.length - 1}
                className={`absolute -left-4 lg:-left-12 top-[35%] z-20 w-16 h-16 rounded-full bg-white border border-zinc-200 flex items-center justify-center transition-all ${
                  activeIndex >= products.length - 1 
                    ? 'opacity-0 pointer-events-none' 
                    : 'text-zinc-900 shadow-xl hover:bg-zinc-900 hover:border-zinc-900 hover:text-white hover:scale-110 cursor-pointer'
                }`}
                aria-label="Next"
              >
                <svg className="w-7 h-7 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>

              {/* Right Arrow (Prev in RTL) pushed further out */}
              <button 
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`absolute -right-4 lg:-right-12 top-[35%] z-20 w-16 h-16 rounded-full bg-white border border-zinc-200 flex items-center justify-center transition-all ${
                  activeIndex === 0 
                    ? 'opacity-0 pointer-events-none' 
                    : 'text-zinc-900 shadow-xl hover:bg-zinc-900 hover:border-zinc-900 hover:text-white hover:scale-110 cursor-pointer'
                }`}
                aria-label="Previous"
              >
                <svg className="w-7 h-7 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product, Variant } from "@/lib/airtable";

const SIZE_ORDER: Record<string, number> = {
  standard: 0,
  l: 1,
  xxl: 2,
};

function sortSizes(sizes: string[]) {
  return [...new Set(sizes)].sort((a, b) => {
    const ka = SIZE_ORDER[a.toLowerCase()] ?? 100;
    const kb = SIZE_ORDER[b.toLowerCase()] ?? 100;
    if (ka !== kb) return ka - kb;
    return a.localeCompare(b, "ar");
  });
}

function findVariant(variants: Variant[], color: string | null, size: string | null) {
  if (!color || !size) return undefined;
  return variants.find((v) => v.color === color && v.size === size);
}

type Props = {
  product: Product;
  variants: Variant[];
};

export default function ProductDetailClient({ product, variants }: Props) {
  const colors = useMemo(
    () => [...new Set(variants.map((v) => v.color))].sort((a, b) => a.localeCompare(b, "ar")),
    [variants]
  );
  const sizes = useMemo(() => sortSizes(variants.map((v) => v.size)), [variants]);

  const [color, setColor] = useState<string | null>(() => variants[0]?.color ?? null);
  const [size, setSize] = useState<string | null>(() => variants[0]?.size ?? null);

  const activeVariant = useMemo(() => findVariant(variants, color, size), [variants, color, size]);

  const onPickColor = (c: string) => {
    setColor(c);
    const withColor = variants.filter((v) => v.color === c);
    if (!withColor.some((v) => v.size === size)) {
      setSize(withColor[0]?.size ?? null);
    }
  };

  const onPickSize = (s: string) => {
    setSize(s);
    const withSize = variants.filter((v) => v.size === s);
    if (!withSize.some((v) => v.color === color)) {
      setColor(withSize[0]?.color ?? null);
    }
  };

  const waText = (() => {
    let t = `أودّ طلب المنتج ${product.name} إذا كان متوفراً لديكم. من فضلكم أريده باللون ${color} وبالمقاس ${size}.`;
    return t;
  })();

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 mb-10 transition-colors"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          العودة إلى المنتجات
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 border border-zinc-100 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl md:text-3xl font-black text-zinc-600">{product.price}</p>
            </div>

            {variants.length > 0 && (
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-sm font-bold text-zinc-500 mb-3">اللون</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => {
                      const selected = color === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => onPickColor(c)}
                          className={`min-h-[44px] px-5 rounded-full text-sm font-bold transition-all border-2 ${
                            selected
                              ? "bg-zinc-900 text-white border-zinc-900"
                              : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-400"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-zinc-500 mb-3">المقاس</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => {
                      const selected = size === s;
                      const combo = findVariant(variants, color, s);
                      const disabled = color ? !variants.some((v) => v.color === color && v.size === s) : false;
                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={disabled}
                          onClick={() => onPickSize(s)}
                          className={`min-h-[44px] px-5 rounded-full text-sm font-bold transition-all border-2 ${
                            disabled
                              ? "opacity-35 cursor-not-allowed border-zinc-100 bg-zinc-50 text-zinc-400"
                              : selected
                                ? "bg-zinc-900 text-white border-zinc-900"
                                : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-400"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeVariant && (
                  <p className="text-sm text-zinc-600">
                    {activeVariant.stock === 0 && (
                      <span className="font-bold text-amber-700">غير متوفر بهذا الخيار</span>
                    )}
                  </p>
                )}
              </div>
            )}

            <a
              href={`https://wa.me/+212684452931?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold py-4 px-4 rounded-full transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-0.5 shadow-md shadow-zinc-900/10"
            >
              اطلب عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

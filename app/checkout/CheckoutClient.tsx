"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  clearCart,
  getCartItems,
  removeCartItem,
  type CartItem,
  updateCartItemQuantity,
} from "@/lib/cart";

type CheckoutForm = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
};

const INITIAL_FORM: CheckoutForm = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
};

export default function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>(() => getCartItems());
  const [form, setForm] = useState(INITIAL_FORM);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (item.priceValue == null) return sum;
        return sum + item.priceValue * item.quantity;
      }, 0),
    [items]
  );

  const updateItems = () => {
    setItems(getCartItems());
  };

  const handleQuantityChange = (itemId: string, nextQuantity: number) => {
    updateCartItemQuantity(itemId, nextQuantity);
    updateItems();
  };

  const handleRemove = (itemId: string) => {
    removeCartItem(itemId);
    updateItems();
  };

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const whatsappHref = useMemo(() => {
    if (items.length === 0) return "https://wa.me/+212684452931";

    const lines = [
      "مرحباً، أود تأكيد هذا الطلب:",
      "",
      ...items.map((item, index) => {
        const specs = [item.color && `اللون: ${item.color}`, item.size && `المقاس: ${item.size}`]
          .filter(Boolean)
          .join(" - ");

        return `${index + 1}. ${item.name} × ${item.quantity}${specs ? ` (${specs})` : ""}`;
      }),
      "",
      `الاسم: ${form.fullName || "-"}`,
      `الهاتف: ${form.phone || "-"}`,
      `المدينة: ${form.city || "-"}`,
      `العنوان: ${form.address || "-"}`,
      subtotal > 0 ? `المجموع التقريبي: ${subtotal} درهم` : null,
    ].filter(Boolean);

    return `https://wa.me/+212684452931?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [form.address, form.city, form.fullName, form.phone, items, subtotal]);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-4">
          <p className="text-sm font-bold tracking-wide text-primary-500">السلة والدفع</p>
          <h1 className="text-3xl md:text-4xl font-black text-zinc-900">إتمام الطلب</h1>
          <p className="max-w-2xl text-zinc-500">
            راجع المنتجات التي أضفتها إلى السلة، ثم املأ بياناتك لإرسال الطلب بسرعة عبر واتساب.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-50 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-black text-zinc-900 mb-3">سلتك فارغة حالياً</h2>
            <p className="text-zinc-500 mb-6">أضف بعض المنتجات أولاً ثم عد هنا لإكمال الطلب.</p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 font-bold text-white transition hover:bg-zinc-800"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-zinc-900">ملخص السلة</h2>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    updateItems();
                  }}
                  className="text-sm font-bold text-zinc-500 transition hover:text-zinc-900"
                >
                  إفراغ السلة
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-4 rounded-[1.5rem] border border-zinc-200 bg-white p-4 md:grid-cols-[110px_1fr]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-zinc-100">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="110px"
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/product/${item.slug}`} className="text-lg font-black text-zinc-900">
                            {item.name}
                          </Link>
                          <p className="text-sm text-zinc-500">
                            {[item.color && `اللون: ${item.color}`, item.size && `المقاس: ${item.size}`]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="text-sm font-bold text-zinc-400 transition hover:text-red-500"
                        >
                          حذف
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-zinc-200">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-11 w-11 text-lg font-bold text-zinc-700 transition hover:bg-zinc-100"
                          >
                            -
                          </button>
                          <span className="min-w-10 text-center font-bold text-zinc-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-11 w-11 text-lg font-bold text-zinc-700 transition hover:bg-zinc-100"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-lg font-black text-zinc-700">
                          {item.priceValue != null ? `${item.priceValue * item.quantity} درهم` : item.price}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 md:p-8 shadow-sm">
              <h2 className="text-2xl font-black text-zinc-900 mb-6">بيانات الطلب</h2>

              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-zinc-600">الاسم الكامل</span>
                  <input
                    value={form.fullName}
                    onChange={(event) => handleInputChange("fullName", event.target.value)}
                    className="h-12 rounded-2xl border border-zinc-200 px-4 outline-none transition focus:border-primary-500"
                    placeholder="أدخل الاسم الكامل"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-zinc-600">رقم الهاتف</span>
                  <input
                    value={form.phone}
                    onChange={(event) => handleInputChange("phone", event.target.value)}
                    className="h-12 rounded-2xl border border-zinc-200 px-4 outline-none transition focus:border-primary-500"
                    placeholder="أدخل رقم الهاتف"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-zinc-600">المدينة</span>
                  <input
                    value={form.city}
                    onChange={(event) => handleInputChange("city", event.target.value)}
                    className="h-12 rounded-2xl border border-zinc-200 px-4 outline-none transition focus:border-primary-500"
                    placeholder="أدخل المدينة"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-zinc-600">العنوان الكامل</span>
                  <textarea
                    value={form.address}
                    onChange={(event) => handleInputChange("address", event.target.value)}
                    className="min-h-28 rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-primary-500"
                    placeholder="الشارع، الحي، أي تفاصيل تساعد في التوصيل"
                  />
                </label>
              </div>

              <div className="my-6 rounded-[1.5rem] bg-zinc-50 p-5">
                <div className="flex items-center justify-between text-zinc-600">
                  <span className="font-medium">عدد المنتجات</span>
                  <span className="font-bold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-zinc-900">
                  <span className="text-lg font-bold">المجموع التقريبي</span>
                  <span className="text-2xl font-black">
                    {subtotal > 0 ? `${subtotal} درهم` : "سيتم التأكيد لاحقاً"}
                  </span>
                </div>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center justify-center rounded-full bg-zinc-900 px-6 text-center font-bold text-white transition hover:bg-zinc-800"
              >
                إرسال الطلب عبر واتساب
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

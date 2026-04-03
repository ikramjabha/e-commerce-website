import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <h1 className="text-2xl font-black text-zinc-900 mb-4">المنتج غير موجود</h1>
        <p className="text-zinc-500 mb-8 text-center max-w-md">
          لم نعثر على هذا المنتج. ربما أزيل أو تغيّر الرابط.
        </p>
        <Link
          href="/#products"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-zinc-900 text-white font-bold hover:bg-zinc-800 transition-colors"
        >
          تصفح المنتجات
        </Link>
      </main>
      <Footer />
    </div>
  );
}

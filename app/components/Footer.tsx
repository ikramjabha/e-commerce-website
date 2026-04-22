import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 text-zinc-600 py-16 border-t border-zinc-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6 opacity-80 grayscale">
              <Logo />
            </div>
            <p className="max-w-sm text-base leading-relaxed mb-8 text-zinc-500">
              متجرك المفضل للحصول على أفضل المنتجات بأعلى جودة وبأسعار تنافسية. نلتزم بتقديم تجربة تسوق تفوق التوقعات.
            </p>
          </div>
          
          <div>
            <h4 className="text-zinc-900 font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-zinc-900 transition-colors">الرئيسية</Link></li>
              <li><Link href="/products" className="hover:text-zinc-900 transition-colors">المنتجات</Link></li>
              <li><Link href="/features" className="hover:text-zinc-900 transition-colors">ميزاتنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-zinc-900 font-bold text-lg mb-6">المساعدة</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/tracking" className="hover:text-zinc-900 transition-colors">تتبع الطلب</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900 transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-400">جميع الحقوق محفوظة &copy; 2026</p>
        </div>
      </div>
    </footer>
  );
}

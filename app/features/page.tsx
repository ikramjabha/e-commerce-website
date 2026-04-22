import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "مميزاتنا | متجرنا",
  description: "اكتشف مميزات منتجاتنا وخدماتنا",
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full bg-zinc-50">
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">مميزاتنا</h1>
              <div className="w-16 h-1 bg-zinc-900 rounded-full mx-auto mb-6"></div>
              <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                نقدم لكم أفضل الخدمات والمنتجات التي تلبي احتياجاتكم بأعلى معايير الجودة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">توصيل سريع</h3>
                <p className="text-zinc-600">نوفر خدمة توصيل سريعة وموثوقة لجميع أنحاء البلاد.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                  💎
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">جودة عالية</h3>
                <p className="text-zinc-600">نضمن لكم جودة جميع منتجاتنا وتطابقها مع المواصفات.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">دفع آمن</h3>
                <p className="text-zinc-600">نقدم خيارات دفع آمنة ومتنوعة لراحتكم.</p>
              </div>
            </div>

            <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl text-center text-white flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">هل تريد معرفة المزيد؟</h2>
              <p className="text-zinc-300 text-lg mb-8 max-w-xl">
                للحصول على المزيد من المعلومات حول مميزاتنا وعروضنا الحصرية، لا تتردد في التواصل معنا. فريقنا جاهز للرد على استفساراتكم.
              </p>
              <a
                href="https://wa.me/+212684452931"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg transition-colors w-full sm:w-auto"
              >
                تواصل معنا عبر الواتساب
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

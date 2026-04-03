import Image from "next/image";

async function getProducts() {
  try {
    const res = await fetch("https://api.airtable.com/v0/appPNGhHIntf8vSoG/tbl2V5avQ8IhreFq7?view=viwlE8vXYyhdMIKLw", {
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

  const whatsappNumber = "212600000000"; // Replace with actual number

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-[12px] bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20">
              م
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-emerald-600 to-teal-800 dark:from-emerald-400 dark:to-teal-600">
              متجر جودة
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 text-zinc-600 dark:text-zinc-400 font-medium">
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">الرئيسية</a>
            <a href="#products" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">المنتجات</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">تواصل معنا</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-20 pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent dark:from-emerald-900/20"></div>
          <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              تشكيلة جديدة وحصرية
            </div>
            <h2 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight mb-6 text-zinc-900 dark:text-white">
              اكتشف عالم التسوق <br className="hidden md:block" /> بأسلوب <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-500 to-teal-600">عصري وأنيق</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              نوفر لك تشكيلة واسعة من المنتجات الفاخرة بأفضل الأسعار المتاحة في السوق. تصفح منتجاتنا واطلب بكل سهولة.
            </p>
            <a href="#products" className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-emerald-600 border border-transparent rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(5,150,105,0.5)]">
              تسوق الآن
              <svg className="w-5 h-5 me-2 transition-transform duration-200 transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 bg-white dark:bg-black relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center mb-16">
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">المنتجات الأكثر مبيعا</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="backdrop-blur-md bg-white/80 dark:bg-black/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                        جديد
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{product.name}</h4>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-6 mt-auto">{product.price}</p>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود طلب المنتج التالي: ${product.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] active:scale-95"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                      اطلب عبر واتساب
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12 border-t border-zinc-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              م
            </div>
            <h2 className="text-xl font-bold text-white">متجر جودة</h2>
          </div>
          <p className="mb-6 max-w-md mx-auto">
            متجرك المفضل للحصول على أفضل المنتجات بأعلى جودة وبأسعار تنافسية.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            {/* Social Icons Placeholders */}
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
              IN
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
              FB
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
              X
            </a>
          </div>
          <p className="text-sm">جميع الحقوق محفوظة &copy; 2026 متجر جودة</p>
        </div>
      </footer>
    </div>
  );
}

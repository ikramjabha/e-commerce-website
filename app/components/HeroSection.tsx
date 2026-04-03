import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full px-4 lg:px-8 xl:px-12 mt-6 mb-16">
      <section className="relative w-full h-[80vh] lg:h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* User's Specific Photo Background */}
        <Image 
          src="https://images.unsplash.com/photo-1773097259285-1453e8465907?q=80&w=2071&auto=format&fit=crop"
          alt="Luxury Store Hero"
          fill
          priority
          className="object-cover object-[center_20%]"
        />
        
        {/* Dark contrast gradient so white text pops clearly */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
        
        {/* Content Centered completely */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-8 md:p-16">
          <div className="max-w-4xl flex flex-col items-center text-center">
            
            <div style={{ animation: "var(--animate-fade-in-up)" }} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-black uppercase tracking-widest mb-8 shadow-xl border border-white/50">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              مجموعة 2026 الحصرية
            </div>
            
            <h2 style={{ animation: "var(--animate-fade-in-up)", animationDelay: "0.1s" }} className="text-4xl md:text-6xl lg:text-[5.5rem] font-black leading-[1.1] mb-6 text-white tracking-tight opacity-0 [-webkit-animation-fill-mode:forwards] drop-shadow-lg">
              عالم التسوق <br /> بأسلوب <span className="text-primary-400">مختلف</span>
            </h2>
            
            <p style={{ animation: "var(--animate-fade-in-up)", animationDelay: "0.2s" }} className="text-lg md:text-xl text-zinc-200 max-w-2xl mb-12 leading-relaxed opacity-0 [-webkit-animation-fill-mode:forwards] font-medium drop-shadow-md">
              نوفر لك تشكيلة واسعة من المنتجات الفاخرة التي تعكس ذوقك الرفيع. جودة لا تُضاهى، وتجربة تسوق لا تُنسى.
            </p>
            
            <div style={{ animation: "var(--animate-fade-in-up)", animationDelay: "0.3s" }} className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto opacity-0 [-webkit-animation-fill-mode:forwards]">
              <a href="#products" className="inline-flex items-center justify-center px-12 py-4 text-base font-bold text-zinc-900 transition-all duration-300 bg-white rounded-full hover:bg-zinc-200 hover:scale-105 shadow-xl">
                تسوق المجموعة
              </a>
              <a href="#arrival" className="inline-flex items-center justify-center px-12 py-4 text-base font-bold text-white transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20">
                اكتشف المزيد
              </a>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

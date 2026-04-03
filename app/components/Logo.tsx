import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm rounded-full overflow-hidden bg-white/50 border border-zinc-100">
        <Image src="/logo.png" alt="MITA Fashion Logo" fill className="object-cover" />
      </div>
      <div 
        className="flex flex-col text-left justify-center mb-1 leading-none h-12 mt-1" 
        style={{ fontFamily: 'Didot, "Playfair Display", Baskerville, "Times New Roman", serif' }}
      >
        <span className="text-2xl font-black tracking-normal text-zinc-900 group-hover:text-primary-500 transition-colors uppercase">MITA</span>
        <span className="text-[0.65rem] font-medium tracking-[0.4em] text-zinc-400 uppercase pl-0.5 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>Fashion</span>
      </div>
    </a>
  );
}

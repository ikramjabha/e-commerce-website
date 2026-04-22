"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-all duration-300 border-b border-zinc-100">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Logo />
          
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-zinc-600 font-bold text-sm tracking-wide">
            <Link href="/" className="hover:text-zinc-900 transition-colors">الرئيسية</Link>
            <Link href="/products" className="hover:text-zinc-900 transition-colors">المنتجات</Link>
            <Link href="/features" className="hover:text-zinc-900 transition-colors">ميزاتنا</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Standard Shopping Bag Icon */}
            <Link href="/products" aria-label="Shopping bag" className="p-2 text-zinc-900 hover:text-primary-500 transition-colors flex items-center group">
              <svg className="w-[1.4rem] h-[1.4rem] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button 
              className="md:hidden p-2 text-zinc-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white md:hidden border-b border-zinc-100 flex flex-col p-6 shadow-xl">
          <nav className="flex flex-col gap-6 text-zinc-900 font-bold text-lg mb-8">
            <Link href="/" className="border-b border-zinc-100 pb-4" onClick={() => setIsMobileMenuOpen(false)}>الرئيسية</Link>
            <Link href="/products" className="border-b border-zinc-100 pb-4" onClick={() => setIsMobileMenuOpen(false)}>المنتجات</Link>
            <Link href="/features" className="border-b border-zinc-100 pb-4" onClick={() => setIsMobileMenuOpen(false)}>ميزاتنا</Link>
          </nav>
        </div>
      )}
    </>
  );
}

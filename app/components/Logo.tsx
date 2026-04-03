import React from "react";

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm rounded-2xl overflow-hidden bg-white/50 border border-zinc-100">
        <svg viewBox="0 0 256 256" width="100%" height="100%" className="drop-shadow-sm">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbfa" />
              <stop offset="100%" stopColor="#fdf4e8" />
            </linearGradient>

            <linearGradient id="satinLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fcd2a2"/>
              <stop offset="45%" stopColor="#d47e11"/>
              <stop offset="100%" stopColor="#8c5006"/>
            </linearGradient>

            <linearGradient id="satinRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd2a2"/>
              <stop offset="45%" stopColor="#d47e11"/>
              <stop offset="100%" stopColor="#8c5006"/>
            </linearGradient>

            <linearGradient id="skirtFold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#995808"/>
              <stop offset="30%" stopColor="#e8a24c"/>
              <stop offset="50%" stopColor="#d47e11"/>
              <stop offset="80%" stopColor="#fcd2a2"/>
              <stop offset="100%" stopColor="#995808"/>
            </linearGradient>
            
            <linearGradient id="beltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#995808"/>
              <stop offset="50%" stopColor="#fcd2a2"/>
              <stop offset="100%" stopColor="#995808"/>
            </linearGradient>
          </defs>

          <rect width="256" height="256" rx="56" fill="url(#bgGrad)" />

          <path d="M 40 256 L 40 128 C 40 70, 80 30, 128 30 C 176 30, 216 70, 216 128 L 216 256 Z" fill="#faebd8" opacity="0.6"/>

          <path d="M 60 50 Q 60 65, 75 65 Q 60 65, 60 80 Q 60 65, 45 65 Q 60 65, 60 50 Z" fill="#d47e11" opacity="0.25" />
          <path d="M 200 80 Q 200 90, 210 90 Q 200 90, 200 100 Q 200 90, 190 90 Q 200 90, 200 80 Z" fill="#d47e11" opacity="0.3" />
          <path d="M 50 180 Q 50 185, 55 185 Q 50 185, 50 190 Q 50 185, 45 185 Q 50 185, 50 180 Z" fill="#d47e11" opacity="0.4" />
          
          <ellipse cx="128" cy="235" rx="55" ry="7" fill="#e3ceb8" opacity="0.6"/>

          <path d="M 128 22 C 136 20, 140 28, 134 32 C 128 36, 128 40, 128 46" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 128 46 C 100 48, 76 58, 76 58 C 74 59, 74 61, 76 62 C 90 58, 110 52, 128 52 C 146 52, 166 58, 180 62 C 182 61, 182 59, 180 58 C 180 58, 156 48, 128 46 Z" fill="#d4af37"/>

          <path d="M 110 56 C 118 60, 138 60, 146 56 L 128 88 Z" fill="#754305" />

          <path d="M 110 56 L 80 62 L 44 145 C 46 165, 56 180, 70 175 C 85 170, 95 145, 100 120 C 104 100, 112 116, 112 116 L 140 116 C 130 90, 116 66, 110 56 Z" fill="url(#satinLeft)" />
          <path d="M 110 56 C 116 66, 130 90, 140 116" fill="none" stroke="#fff8f0" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 80 62 C 70 90, 70 120, 75 155" fill="none" stroke="#8a5007" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>

          <path d="M 146 56 L 176 62 L 212 145 C 210 165, 200 180, 186 175 C 171 170, 161 145, 156 120 C 152 100, 144 116, 144 116 L 116 116 C 126 90, 140 66, 146 56 Z" fill="url(#satinRight)" />
          <path d="M 146 56 C 140 66, 126 90, 116 116" fill="none" stroke="#fff8f0" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 176 62 C 186 90, 186 120, 181 155" fill="none" stroke="#8a5007" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>

          <path d="M 112 126 L 144 126 C 150 160, 170 200, 176 215 C 160 212, 140 220, 128 220 C 116 220, 96 212, 80 215 C 86 200, 106 160, 112 126 Z" fill="url(#skirtFold)"/>
          
          <path d="M 118 126 C 118 160, 108 200, 95 212" fill="none" stroke="#754305" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
          <path d="M 138 126 C 138 160, 148 200, 161 212" fill="none" stroke="#754305" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
          <path d="M 128 126 C 128 160, 128 200, 128 219" fill="none" stroke="#fff8f0" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>

          <path d="M 110 116 L 146 116 L 144 126 L 112 126 Z" fill="url(#beltGrad)"/>
          <path d="M 128 121 C 115 110, 100 130, 128 126 Z" fill="url(#satinRight)"/>
          <path d="M 128 121 C 141 110, 156 130, 128 126 Z" fill="url(#satinLeft)"/>
          <path d="M 126 125 C 115 145, 112 170, 112 170 C 118 172, 122 165, 124 150 C 126 140, 128 128, 128 128 Z" fill="url(#satinRight)"/>
          <path d="M 130 125 C 141 145, 144 170, 144 170 C 138 172, 134 165, 132 150 C 130 140, 128 128, 128 128 Z" fill="url(#satinLeft)"/>
          <circle cx="128" cy="123" r="3.5" fill="#fcd2a2"/>

          <path d="M 45 142 C 47 162, 57 177, 71 172 C 86 167, 96 142, 101 117" fill="none" stroke="#fff8f0" strokeWidth="2.5" opacity="0.9" strokeLinecap="round"/>
          <path d="M 46 146 C 48 166, 58 181, 72 176 C 87 171, 97 146, 102 121" fill="none" stroke="#fff8f0" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.9" strokeLinecap="round"/>

          <path d="M 211 142 C 209 162, 199 177, 185 172 C 170 167, 160 142, 155 117" fill="none" stroke="#fff8f0" strokeWidth="2.5" opacity="0.9" strokeLinecap="round"/>
          <path d="M 210 146 C 208 166, 198 181, 184 176 C 169 171, 159 146, 154 121" fill="none" stroke="#fff8f0" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.9" strokeLinecap="round"/>

          <path d="M 82 211 C 98 204, 116 216, 128 216 C 140 216, 158 204, 174 211" fill="none" stroke="#fff8f0" strokeWidth="3" opacity="0.9" strokeLinecap="round"/>
          <path d="M 81 215 C 97 208, 115 220, 128 220 C 141 220, 159 208, 175 215" fill="none" stroke="#fff8f0" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.9" strokeLinecap="round"/>
        </svg>
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

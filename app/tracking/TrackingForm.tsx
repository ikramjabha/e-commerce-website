"use client";

import { useState } from "react";

export default function TrackingForm() {
  const [orderId, setOrderId] = useState("");

  const handleTrack = () => {
    if (!orderId.trim()) return;
    const text = `مرحباً، أود تتبع طلبي رقم: ${orderId.trim()}`;
    const url = `https://wa.me/+212684452931?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleTrack();
        }}
        placeholder="رقم الطلب (مثال: #12345)"
        className="flex-1 px-6 py-4 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-center sm:text-right"
      />
      <button
        onClick={handleTrack}
        className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-bold transition-colors"
      >
        تتبع الآن
      </button>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function VerifySearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = value.trim().toUpperCase();
    if (!id) return;
    router.push(`/verify/${id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Zertifikat-ID, z.B. SS-2025-0042"
        className="flex-1 bg-[#111] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-mono"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-colors rounded-xl px-5 py-3 text-sm font-bold text-white shrink-0"
      >
        <Search size={16} />
        Prüfen
      </button>
    </form>
  );
}

"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-10 bg-black text-white relative">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-left mb-4 md:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative h-10 w-10">
              <Image src="/logo.png" alt="S&A Data Services" fill className="object-contain" />
            </div>
            <div>
              <div className="font-semibold">S&A Data Services</div>
              <div className="text-sm text-white/70">(PG0549874-V)</div>
            </div>
          </div>
          <div className="text-sm text-white/80">
            <div className="font-semibold">Office Hours</div>
            <div>Monday to Friday (9:00 AM – 6:00 PM)</div>
          </div>
        </div>
        <div className="text-sm text白/70 text-center md:text-right">© {new Date().getFullYear()} S&A Data Services. All rights reserved.</div>
      </div>

      {/* Back to Top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="absolute right-6 bottom-6 bg-[#0097E6] hover:bg-[#007ACC] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
        ↑ Back to Top
      </button>
    </footer>
  );
}

"use client";
import Image from "next/image";

export default function CTASection() {
  return (
    <section id="contact" className="py-20 bg-[#0A1E3F]">
      <div className="mx-auto max-w-6xl px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">Let’s make your next project smarter.</h2>
        <p className="text-gray-300 mb-8">Start your digital transformation journey with S&A Data Services.</p>
        <div className="flex justify-center gap-6 items-center">
          <a href="https://wa.me/601174249863?text=Hi%20S%26A%20Data%20Services" target="_blank" className="w-14 h-14 flex items-center justify-center bg-[#25D366] rounded-full hover:scale-105 transition">
            <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
          </a>
          <a href="mailto:syameer.sads@gmail.com?subject=Inquiry" className="w-14 h-14 flex items-center justify-center bg-white rounded-full hover:scale-105 transition">
            <Image src="/email-icon.svg" alt="Email" width={26} height={26} />
          </a>
          <a href="https://tidycal.com/sads/inquiry-session" target="_blank" className="px-6 py-3 rounded-lg bg-[#0097E6] font-medium hover:bg-[#007ACC] transition">
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

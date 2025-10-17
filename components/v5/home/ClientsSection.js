"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerStagger, itemFadeUp } from "../../v5/utils/animations";

export default function ClientsSection() {
  return (
    <motion.section id="clients" variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h2 variants={itemFadeUp} className="text-3xl font-bold text-[#0A1E3F]">
          Our Clients
        </motion.h2>
        <motion.p variants={itemFadeUp} className="mt-3 text-gray-600">
          Trusted by industry leaders — <span className="font-semibold">15+ projects completed</span>.
        </motion.p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {["client1.png", "client2.png", "client3.png", "client4.png"].map((logo) => (
            <motion.div key={logo} variants={itemFadeUp} whileHover={{ scale: 1.05 }} className="relative h-20 bg-white rounded-xl p-3 flex items-center justify-center shadow-sm">
              <Image src={`/${logo}`} alt={logo} fill className="object-contain rounded-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

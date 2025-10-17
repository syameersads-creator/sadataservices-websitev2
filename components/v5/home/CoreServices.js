"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerStagger, itemFadeUp } from "../../v5/utils/animations";

export default function CoreServices() {
  return (
    <motion.section id="core-services" variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2 variants={itemFadeUp} className="text-3xl font-bold text-center text-[#0A1E3F]">
          Core Services
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Dashboard Development & Training", "/Core-Dashboard Development  Training.png"],
            ["Automation & Agentic AI Development", "/Core-Automation& Agentic Ai Dev.png"],
            ["Construction Design Management Consultation", "/Core-Construction Design management (CDM).png"],
          ].map(([title, img]) => (
            <motion.div key={title} variants={itemFadeUp} whileHover={{ scale: 1.02 }} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition text-center">
              <div className="relative w-full h-40 mb-4">
                <Image src={img} alt={title} fill className="object-contain rounded-lg" />
              </div>
              <h3 className="text-lg font-semibold text-[#0097E6]">{title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

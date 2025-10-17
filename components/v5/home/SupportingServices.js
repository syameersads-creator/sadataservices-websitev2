"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerStagger, itemFadeUp } from "../../v5/utils/animations";

export default function SupportingServices() {
  return (
    <motion.section variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2 variants={itemFadeUp} className="text-3xl font-bold text-center text-[#0A1E3F] mt-0">
          Supporting Services
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Laser Scanning Services", "/Support-Laser Scanning.png"],
            ["BIM Modelling & Coordination Services", "/Support-BIMservices.png"],
            ["5D Quantity Take-off from BIM Models", "/supporting-5D Quantity Takeoff.png"],
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

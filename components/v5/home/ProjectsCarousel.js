"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectsCarousel() {
  const projects = [
    {
      src: "/BIMservices-Terrapong-Project1.png",
      title: "Terrapong Restaurant Project",
      desc: "We converted Terrapong restaurant TLS and drone laser scanned data into a detailed BIM model for renovation planning and design.",
    },
    {
      src: "/BIMservice-BHC-Project2.png",
      title: "British High Commissioner Project",
      desc: "Refurbishment of the British High Commissioner’s Residence at Jalan U Thant, Kuala Lumpur made easier with scan-to-BIM technology.",
    },
    {
      src: "/BIMservice-MZAS-Project3.png",
      title: "Majid Zahir Alor Setar Project",
      desc: "Integration of TLS scan data and BIM model for accurate as-built documentation, facility planning and video rendering.",
    },
    {
      src: "/BIMservices-KPJ-Arc-Project4.jpg",
      title: "KPJ Penang Project",
      desc: "Full architectural, structural and MEP BIM model development for visualization and coordination deliverables during the detailed design stage.",
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  return (
    <motion.section id="projects" initial="hidden" whileInView="show" viewport={{ once: true }} className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-center text-[#0A1E3F]">Featured Projects</h2>
        <div className="relative mt-12 overflow-hidden rounded-2xl">
          <motion.div animate={{ x: `-${index * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }} className="flex">
            {projects.map((p) => (
              <div key={p.title} className="min-w-full grid md:grid-cols-2">
                <div className="relative h-72 md:h-[420px]">
                  <Image src={p.src} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-8 md:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0097E6]">{p.title}</h3>
                    <p className="mt-4 text-gray-600">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow px-3 py-2 hover:bg-white">‹</button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow px-3 py-2 hover:bg-white">›</button>
        </div>
      </div>
    </motion.section>
  );
}

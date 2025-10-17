"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 400], [0, 100]);
  const textY = useTransform(scrollY, [0, 400], [0, -50]);

  return (
    <section id="hero" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.iframe
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/GCAbhOL23Oo?autoplay=1&mute=1&loop=1&playlist=GCAbhOL23Oo&controls=0&showinfo=0&modestbranding=1"
        title="Showcase Video"
        allow="autoplay; fullscreen"
      />
      <div className="absolute inset-0 bg-black/45" />
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">Your Project. Smarter. Faster. Digital.</h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Transforming the construction and built environment sectors with data, automation, and AI-driven solutions.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#core-services" className="px-6 py-3 bg-[#0097E6] text-white rounded-lg font-medium hover:bg-[#007ACC] transition">
            View Services
          </a>
          <a href="/training" className="px-6 py-3 border border-white/70 text-white rounded-lg font-medium hover:bg-white hover:text-black transition">
            View Trainings
          </a>
        </div>
      </motion.div>
    </section>
  );
}

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

export default function Home() {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 400], [0, 100]);
  const textY = useTransform(scrollY, [0, 400], [0, -50]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [index, setIndex] = useState(0);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  const containerStagger = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };
  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.main
        key="home"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-gray-900 bg-white overflow-x-hidden"
      >
        {/* ===== HEADER ===== */}
        <header
          className={`sticky top-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-white/90 backdrop-blur border-b border-gray-200"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <div
              onClick={() => scrollToSection("#hero")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Image
                src="/logo.png"
                alt="S&A Data Services"
                width={40}
                height={40}
              />
              <span className="text-lg md:text-xl font-semibold tracking-tight">
                S&amp;A Data Services
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              {[
                ["Home", "#hero"],
                ["Services", "#core-services"],
                ["Projects Completed", "#projects"],
                ["Our Clients", "#clients"],
                ["Contact", "#contact"],
                ["Training", "https://tidycal.com/sads"],
              ].map(([label, link]) =>
                link.startsWith("#") ? (
                  <button
                    key={label}
                    onClick={() => scrollToSection(link)}
                    className="relative text-gray-700 hover:text-[#0097E6] transition"
                  >
                    {label}
                  </button>
                ) : (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    className="relative text-gray-700 hover:text-[#0097E6] transition"
                  >
                    {label}
                  </a>
                )
              )}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                className="block h-0.5 w-6 bg-gray-800 rounded"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-0.5 w-6 bg-gray-800 rounded"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                className="block h-0.5 w-6 bg-gray-800 rounded"
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-50 flex flex-col p-6"
                >
                  <nav className="mt-8 flex flex-col gap-4 text-gray-800">
                    {[
                      ["Home", "#hero"],
                      ["Services", "#core-services"],
                      ["Projects Completed", "#projects"],
                      ["Our Clients", "#clients"],
                      ["Contact", "#contact"],
                    ].map(([label, id]) => (
                      <button
                        key={label}
                        onClick={() => scrollToSection(id)}
                        className="text-lg font-medium hover:text-[#0097E6] transition text-left"
                      >
                        {label}
                      </button>
                    ))}
                    <a
                      href="https://tidycal.com/sads"
                      target="_blank"
                      className="text-lg font-medium hover:text-[#0097E6] transition"
                    >
                      Training
                    </a>
                  </nav>
                  <div className="mt-auto pt-8 text-sm text-gray-500">
                    <p>© 2025 S&A Data Services</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </header>

        {/* ===== HERO ===== */}
        <section
          id="hero"
          className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        >
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
              Your Project. Smarter. Faster. Digital.
            </h1>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Transforming the construction and built environment sectors with
              data, automation, and AI-driven solutions.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection("#core-services")}
                className="px-6 py-3 bg-[#0097E6] text-white rounded-lg font-medium hover:bg-[#007ACC] transition"
              >
                View Services
              </button>
              <a
                href="https://tidycal.com/sads"
                target="_blank"
                className="px-6 py-3 border border-white/70 text-white rounded-lg font-medium hover:bg-white hover:text-black transition"
              >
                View Trainings
              </a>
            </div>
          </motion.div>
        </section>

        {/* ===== CORE & SUPPORTING SERVICES ===== */}
        <motion.section
          id="core-services"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-20 bg-gray-50"
        >
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2
              variants={itemFadeUp}
              className="text-3xl font-bold text-center text-[#0A1E3F]"
            >
              Core Services
            </motion.h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                ["Dashboard Development & Training", "/Core-Dashboard Development  Training.png"],
                ["Automation & Agentic AI Development", "/Core-Automation& Agentic Ai Dev.png"],
                ["Construction Design Management Consultation", "/Core-Construction Design management (CDM).png"],
              ].map(([title, img]) => (
                <motion.div
                  key={title}
                  variants={itemFadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition text-center"
                >
                  <div className="relative w-full h-40 mb-4">
                    <Image src={img} alt={title} fill className="object-contain rounded-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0097E6]">{title}</h3>
                </motion.div>
              ))}
            </div>

            <motion.h2
              variants={itemFadeUp}
              className="text-3xl font-bold text-center text-[#0A1E3F] mt-20"
            >
              Supporting Services
            </motion.h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                ["Laser Scanning Services", "/Support-Laser Scanning.png"],
                ["BIM Modelling & Coordination Services", "/Support-BIMservices.png"],
                ["5D Quantity Take-off from BIM Models", "/supporting-5D Quantity Takeoff.png"],
              ].map(([title, img]) => (
                <motion.div
                  key={title}
                  variants={itemFadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition text-center"
                >
                  <div className="relative w-full h-40 mb-4">
                    <Image src={img} alt={title} fill className="object-contain rounded-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0097E6]">{title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== PROJECT SHOWCASE ===== */}
        <motion.section
          id="projects"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-20 bg-white"
        >
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold text-center text-[#0A1E3F]">
              Featured Projects
            </h2>
            <div className="relative mt-12 overflow-hidden rounded-2xl">
              <motion.div
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex"
              >
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
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow px-3 py-2 hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow px-3 py-2 hover:bg-white"
              >
                ›
              </button>
            </div>
          </div>
        </motion.section>

        {/* ===== CLIENTS ===== */}
        <motion.section
          id="clients"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-20 bg-gray-50"
        >
          <div className="mx-auto max-w-6xl px-6 text-center">
            <motion.h2
              variants={itemFadeUp}
              className="text-3xl font-bold text-[#0A1E3F]"
            >
              Our Clients
            </motion.h2>
            <motion.p variants={itemFadeUp} className="mt-3 text-gray-600">
              Trusted by industry leaders —{" "}
              <span className="font-semibold">15+ projects completed</span>.
            </motion.p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {["client1.png", "client2.png", "client3.png", "client4.png"].map(
                (logo) => (
                  <motion.div
                    key={logo}
                    variants={itemFadeUp}
                    whileHover={{ scale: 1.05 }}
                    className="relative h-20 bg-white rounded-xl p-3 flex items-center justify-center shadow-sm"
                  >
                    <Image
                      src={`/${logo}`}
                      alt={logo}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.section>

        {/* ===== CTA ===== */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-[#0A1E3F]"
        >
          <div className="mx-auto max-w-6xl px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">
              Let’s make your next project smarter.
            </h2>
            <p className="text-gray-300 mb-8">
              Start your digital transformation journey with S&amp;A Data
              Services.
            </p>
            <div className="flex justify-center gap-6 items-center">
              <a
                href="https://wa.me/601174249863?text=Hi%20S%26A%20Data%20Services"
                target="_blank"
                className="w-14 h-14 flex items-center justify-center bg-[#25D366] rounded-full hover:scale-105 transition"
              >
                <Image
                  src="/whatsapp-icon.svg"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
              </a>
              <a
                href="mailto:syameer.sads@gmail.com?subject=Inquiry"
                className="w-14 h-14 flex items-center justify-center bg-white rounded-full hover:scale-105 transition"
              >
                <Image src="/email-icon.svg" alt="Email" width={26} height={26} />
              </a>
              <a
                href="https://tidycal.com/sads/inquiry-session"
                target="_blank"
                className="px-6 py-3 rounded-lg bg-[#0097E6] font-medium hover:bg-[#007ACC] transition"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </motion.section>

        {/* ===== FOOTER ===== */}
        <footer className="py-10 bg-black text-white relative">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-left mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative h-10 w-10">
                  <Image
                    src="/logo.png"
                    alt="S&A Data Services"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="font-semibold">S&amp;A Data Services</div>
                  <div className="text-sm text-white/70">(PG0549874-V)</div>
                </div>
              </div>
              <div className="text-sm text-white/80">
                <div className="font-semibold">Office Hours</div>
                <div>Monday to Friday (9:00 AM – 6:00 PM)</div>
              </div>
            </div>
            <div className="text-sm text-white/70 text-center md:text-right">
              © 2025 S&amp;A Data Services. All rights reserved.
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute right-6 bottom-6 bg-[#0097E6] hover:bg-[#007ACC] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
          >
            ↑ Back to Top
          </button>
        </footer>
      </motion.main>
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollPos, setScrollPos] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => setScrollPos(latest));
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const projects = [
    {
      src: "/BIMservices-Terrapong-Project1.png",
      title: "Terrapong Restaurant Project",
      desc:
        "We converted Terrapong restaurant TLS and drone laser scanned data into a detailed BIM model for renovation planning and design.",
    },
    {
      src: "/BIMservice-BHC-Project2.png",
      title: "British High Commissioner Project",
      desc:
        "Refurbishment of the British High Commissioner’s Residence at Jalan U Thant, Kuala Lumpur made easier with scan-to-BIM technology.",
    },
    {
      src: "/BIMservice-MZAS-Project3.png",
      title: "Masjid Zahir Alor Setar Project",
      desc:
        "Integration of TLS scan data and BIM model for accurate as-built documentation, facility planning and video rendering.",
    },
    {
      src: "/BIMservices-KPJ-Arc-Project4.jpg",
      title: "KPJ Penang Project",
      desc:
        "Full architectural, structural and MEP BIM model development for visualization and coordination deliverables during the detailed design stage.",
    },
    {
      src: "/BIMservice-BSASA-Project5.png",
      title: "Bangunan Sultan Abdul Samad Project",
      desc:
        "Detailed scan-to-BIM services to optimize heritage building refurbishment.",
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  // Scroll-based hero text animation
  const textY = useTransform(scrollY, [0, 200], [0, -80]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0.2]);

  return (
    <main className="text-gray-900 bg-white overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrollPos > 100
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <motion.div
            animate={{
              y: [0, -2, 0],
              scale: scrollPos > 100 ? 0.9 : 1,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-3"
          >
            <Image src="/logo.png" alt="S&A Data Services" width={40} height={40} />
            <span
              className={`text-lg md:text-xl font-semibold tracking-tight transition-colors ${
                scrollPos > 100 ? "text-gray-900" : "text-white"
              }`}
            >
              S&amp;A Data Services
            </span>
          </motion.div>

          {/* Navigation */}
          <nav
            className={`hidden md:flex items-center gap-6 text-sm transition-colors ${
              scrollPos > 100 ? "text-gray-800" : "text-white"
            }`}
          >
            <button onClick={() => scrollToSection("services")} className="hover:text-[#0097E6] transition">
              Services
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-[#0097E6] transition">
              Projects
            </button>
            <button onClick={() => scrollToSection("clients")} className="hover:text-[#0097E6] transition">
              Clients
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-[#0097E6] transition">
              Contact
            </button>
            <a
              href="https://tidycal.com/sads"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0097E6] transition"
            >
              Training
            </a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        {/* YouTube background - full cover with fade-in */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full scale-[1.2]">
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/GCAbhOL23Oo?autoplay=1&mute=1&loop=1&controls=0&playlist=GCAbhOL23Oo&modestbranding=1&rel=0"
              title="S&A Data Services Project Video"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Fade-in overlay */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-black"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Text overlay */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-md">
            Your Project. Smarter. Faster. Digital.
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Transforming the construction and built environment sectors with data,
            automation, and AI-driven solutions.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://tidycal.com/sads/inquiry-session"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0097E6] text-white rounded-lg font-medium hover:bg-[#007ACC] transition"
            >
              Book a Consultation
            </a>
            <button
              onClick={() => scrollToSection("services")}
              className="px-6 py-3 border border-white/70 text-white rounded-lg font-medium hover:bg-white hover:text-black transition"
            >
              View Services
            </button>
          </div>
        </motion.div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <motion.section
        id="services"
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <motion.h2 variants={fadeInVariant} className="text-3xl font-bold text-center text-[#0A1E3F]">
          Core Services
        </motion.h2>
        <motion.div variants={containerStagger} className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto px-6">
          {[
            { img: "/Core-Dashboard%20Development%20%20Training.png", title: "Dashboard Development & Training", desc: "Interactive analytics to improve project visibility and decision-making." },
            { img: "/Core-Automation%26%20Agentic%20Ai%20Dev.png", title: "Automation & Agentic AI Development", desc: "Workflow automation and intelligent AI agents for project operations." },
            { img: "/Core-Construction%20Design%20management%20%28CDM%29.png", title: "Construction Design Management Consultation", desc: "Digital consultation and BIM coordination for smarter delivery." },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeInVariant} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition">
              <div className="relative w-full h-44 mb-5 overflow-hidden rounded-xl bg-gray-100">
                <Image src={s.img} alt={s.title} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-[#0097E6]">{s.title}</h3>
              <p className="mt-3 text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ===== SUPPORTING SERVICES ===== */}
      <motion.section variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-20 bg-white">
        <motion.h2 variants={fadeInVariant} className="text-3xl font-bold text-center text-[#0A1E3F]">
          Supporting Services
        </motion.h2>
        <motion.div variants={containerStagger} className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto px-6">
          {[
            { img: "/Support-Laser%20Scanning.png", title: "Laser Scanning Services", desc: "TLS, SLAM & Drone capture for precise as-builts and digital twins." },
            { img: "/Support-BIMservices.png", title: "BIM Modelling & Coordination Services", desc: "Discipline coordination for clash-free delivery and smoother construction." },
            { img: "/supporting-5D%20Quantity%20Takeoff.png", title: "5D Quantity Take-off from BIM Models", desc: "Accurate quantity & cost extraction linked to model intelligence." },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeInVariant} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition">
              <div className="relative w-full h-44 mb-5 overflow-hidden rounded-xl bg-gray-100">
                <Image src={s.img} alt={s.title} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-[#0097E6]">{s.title}</h3>
              <p className="mt-3 text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ===== PROJECT SHOWCASE ===== */}
      <motion.section
        id="projects"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0A1E3F] mb-3">Featured Projects</h2>
          <p className="text-gray-600">Explore our key digital transformation projects in the built environment.</p>
        </div>
        <motion.div className="relative mt-12 overflow-hidden rounded-2xl max-w-6xl mx-auto">
          <motion.div animate={{ x: `-${index * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }} className="flex">
            {projects.map((p, i) => (
              <div key={p.title} className="min-w-full grid md:grid-cols-2 bg-gray-50">
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
        </motion.div>
      </motion.section>

      {/* ===== CLIENTS ===== */}
      <motion.section
        id="clients"
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-gray-50"
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2 variants={fadeInVariant} className="text-3xl font-bold text-[#0A1E3F]">
            Our Clients
          </motion.h2>
          <motion.p variants={fadeInVariant} className="mt-3 text-gray-600">
            Trusted by industry leaders — <span className="font-semibold">15+ projects completed</span>.
          </motion.p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {["client1.png", "client2.png", "client3.png", "client4.png"].map((logo) => (
              <motion.div key={logo} variants={fadeInVariant} whileHover={{ scale: 1.05 }} className="relative h-20 bg-white rounded-xl p-3 flex items-center justify-center transition">
                <Image src={`/${logo}`} alt={logo.replace(".png", "")} fill className="object-contain rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section
        id="contact"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 bg-[#0A1E3F] text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-3">Let’s make your next project smarter.</h2>
        <p className="text-gray-300 mb-8">Start your digital transformation journey with S&amp;A Data Services.</p>
        <div className="flex justify-center gap-6 items-center">
          <a href="https://wa.me/601174249863" target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#25D366] rounded-full hover:scale-105 transition">
            <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
          </a>
          <a href="mailto:syameer.sads@gmail.com" className="w-14 h-14 flex items-center justify-center bg-white rounded-full hover:scale-105 transition">
            <Image src="/email-icon.svg" alt="Email" width={26} height={26} />
          </a>
          <a href="https://tidycal.com/sads/inquiry-session" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-[#0097E6] font-medium hover:bg-[#007ACC] transition">
            Book Consultation Session
          </a>
        </div>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-10 bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-10 w-10">
                <Image src="/logo.png" alt="S&A Data Services" fill className="object-contain" />
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
          <div className="text-sm text-white/70 self-center md:self-end md:text-right">
            © 2025 S&amp;A Data Services. All rights reserved.
          </div>
        </div>

        {/* BACK TO TOP BUTTON */}
        {showTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#0097E6] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
            title="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </footer>
    </main>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const NavLinks = (
    <>
      {[
        ["Home", "#hero"],
        ["Services", "#core-services"],
        ["Projects Completed", "#projects"],
        ["Our Clients", "#clients"],
        ["Contact", "#contact"],
        ["Training", "/training"],
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
          <Link
            key={label}
            href={link}
            className="relative text-gray-700 hover:text-[#0097E6] transition"
          >
            {label}
          </Link>
        )
      )}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
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
            S&A Data Services
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NavLinks}
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

                {/* Fixed Training Link */}
                <Link
                  href="/training"
                  className="text-lg font-medium hover:text-[#0097E6] transition text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  Training
                </Link>
              </nav>

              <Link
              href="/training"
              className="text-lg font-medium hover:text-[#0097E6] transition text-left mt-2"
              >
              Training
              </Link>

              <div className="mt-auto pt-8 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} S&A Data Services</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ThankYouPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("booking") === "success") {
        setShow(true);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-[90%] sm:w-80"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-5 text-gray-800 relative overflow-hidden">
            {/* Accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0097E6] to-[#00BFFF]" />

            {/* Logo */}
            <div className="flex items-center justify-center mb-3 mt-1">
              <Image
                src="/logo.png"
                alt="S&A Data Services"
                width={40}
                height={40}
                className="rounded-full shadow-sm"
              />
            </div>

            {/* Text */}
            <h4 className="text-[#0097E6] font-semibold text-lg mb-1 text-center">
              You’re all set!
            </h4>
            <p className="text-sm text-center leading-relaxed mb-4">
              Thanks for booking with <b>S&amp;A Data Services</b>.<br />
              Let’s keep your digital transformation going — explore our site or
              discover more training sessions below.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <a
                href="https://tidycal.com/sads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 text-sm font-medium text-white bg-[#0097E6] rounded-lg hover:bg-[#007ACC] transition text-center"
              >
                View Trainings
              </a>

              <a
                href="/"
                className="w-full py-2 text-sm font-medium text-[#0097E6] border border-[#0097E6]/60 rounded-lg hover:bg-[#0097E6] hover:text-white transition text-center"
              >
                Browse Website
              </a>

              <button
                onClick={() => setShow(false)}
                className="mt-1 w-full py-1.5 text-xs text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

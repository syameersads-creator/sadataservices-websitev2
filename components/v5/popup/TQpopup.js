"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * 🔄 CHANGELOG — TQpopup.js
 * ------------------------------------------------------------------------
 * v4 (Legacy)
 *  - Name: ThankYouPopup.js
 *  - Used external TidyCal link.
 *  - No outside-click dismissal.
 *  - Medium size (~80% width).
 *
 * v5 (Current)
 *  - Renamed permanently to TQpopup.js
 *  - Switched “View Trainings” to internal /training route.
 *  - Enlarged popup (sm:w-96 → md:w-[420px]).
 *  - Added auto-hide when clicking outside.
 *  - Combined fade, slide & scale animations.
 *  - Improved backdrop blur and accent line styling.
 * ------------------------------------------------------------------------
 */

export default function TQpopup() {
  const [show, setShow] = useState(false);
  const popupRef = useRef(null);

  // ✅ Detect ?booking=success in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("booking") === "success") setShow(true);
    }
  }, []);

  // ✅ Hide on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex justify-end items-end pr-6 pb-6 sm:pr-10 sm:pb-10"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />

          <motion.div
            ref={popupRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-6 w-[95%] sm:w-96 md:w-[420px] text-gray-800 z-[70] overflow-hidden"
          >
            {/* Accent top line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0097E6] to-[#00BFFF]" />

            {/* Logo */}
            <div className="flex items-center justify-center mt-2 mb-3">
              <Image src="/logo.png" alt="S&A Data Services" width={48} height={48} className="rounded-full shadow" />
            </div>

            {/* Text */}
            <h4 className="text-[#0097E6] font-semibold text-lg text-center mb-1">You’re all set!</h4>
            <p className="text-sm text-center leading-relaxed mb-5">
              Thank you for registering with <b>S&amp;A Data Services</b>.<br />
              Explore more training sessions or browse our latest services.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <a href="/training" className="w-full py-2 text-sm font-medium text-white bg-[#0097E6] rounded-lg hover:bg-[#007ACC] transition text-center">
                View Trainings
              </a>
              <a href="/" className="w-full py-2 text-sm font-medium text-[#0097E6] border border-[#0097E6]/60 rounded-lg hover:bg-[#0097E6] hover:text-white transition text-center">
                Browse Website
              </a>
              <button onClick={() => setShow(false)} className="mt-1 w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 transition">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

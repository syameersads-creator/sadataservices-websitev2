"use client";
import React, { useState, useEffect, useRef } from "react";

export default function TrainingPage() {
  const bookingBaseUrl = "https://tidycal.com/sads/";

  const allTrainings = [
    { id: 1, title: "RV01 - Revit for Working Professionals", software: "Autodesk Revit", duration: "1 day", price: "RM 699", priceType: "Paid", type: "Physical", tidycalkey: "rvt01", description: "Kickstart your AEC career with project-based Revit training that equips you for real-world BIM workflows." },
    { id: 2, title: "AI01 - Practical AI Tools for Engineers", software: "ChatGPT Canvas", duration: "2 hours", price: "RM 80", priceType: "Paid", type: "Online", tidycalkey: "ai01", description: "Discover how AI enhances design, documentation, and coordination in modern construction projects." },
    { id: 3, title: "CDM01 - Construction Design Management Basics", software: "Others", duration: "4 hours", price: "RM 100", priceType: "Paid", type: "e-Learning", tidycalkey: "cdm01", description: "Learn essential CDM principles for project safety, compliance, and design collaboration." },
    { id: 4, title: "BI01 - Power BI Fundamentals for BIM", software: "Power BI", duration: "1 day", price: "RM 599", priceType: "Paid", type: "Online", tidycalkey: "pbi01", description: "Understand data visualization and analytics using Power BI to enhance BIM reporting and insights." },
    { id: 5, title: "VS01 - Efficiency with VSCode for BIM", software: "VSCode", duration: "2 hours", price: "Free", priceType: "Free", type: "e-Learning", tidycalkey: "vsc01", description: "Boost your productivity and learn how to automate BIM workflows using VSCode extensions and scripts." },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ software: [], priceType: [], type: [] });
  const [filteredTrainings, setFilteredTrainings] = useState(allTrainings);
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});

  const openBookingModal = (tidycalkey, title) => {
    setModalSrc(`${bookingBaseUrl}${tidycalkey}`);
    setModalTitle(title);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeBookingModal = () => {
    setShowModal(false);
    setModalSrc("");
    document.body.style.overflow = "auto";
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const selected = prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: selected };
    });
  };

  const resetFilters = () => {
    setFilters({ software: [], priceType: [], type: [] });
    setSearchQuery("");
  };

  // ✅ Close dropdowns only if clicking completely outside any dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideAnyDropdown = Object.values(dropdownRefs.current).some(ref => ref?.contains(event.target));
      if (!clickedInsideAnyDropdown) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = allTrainings.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSoftware = filters.software.length === 0 || filters.software.includes(t.software);
      const matchPrice = filters.priceType.length === 0 || filters.priceType.includes(t.priceType);
      const matchType = filters.type.length === 0 || filters.type.includes(t.type);
      return matchSearch && matchSoftware && matchPrice && matchType;
    });
    setFilteredTrainings(filtered);
  }, [searchQuery, filters]);

  const fadeRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    }, { threshold: 0.1 });
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filteredTrainings]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white p-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">S&A Training Hub</h1>
          <p className="text-gray-600 mb-4">
            Explore professional trainings crafted for AEC professionals.
          </p>

          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 mb-3"
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-between flex-wrap items-center px-3 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap w-full">
              {[
                {
                  label: "Softwares",
                  key: "software",
                  options: [
                    "Autodesk Revit", "ChatGPT Canvas", "Gemini Canvas",
                    "Microsoft Project", "VSCode", "Power BI", "n8n", "Navisworks", "Others",
                  ],
                },
                { label: "Price", key: "priceType", options: ["Free", "Paid"] },
                { label: "Training Type", key: "type", options: ["Physical", "Online", "e-Learning"] },
              ].map(filter => (
                <div
                  key={filter.key}
                  ref={el => (dropdownRefs.current[filter.key] = el)}
                  className="relative w-full sm:w-auto flex-1"
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === filter.key ? null : filter.key)}
                    className="w-full px-4 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm hover:bg-white flex justify-between items-center text-gray-700 font-medium transition"
                  >
                    {filter.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-4 h-4 transform transition-transform duration-200 ${openDropdown === filter.key ? "rotate-180" : ""}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-200 transform origin-top ${
                      openDropdown === filter.key
                        ? "scale-y-100 opacity-100 visible"
                        : "scale-y-95 opacity-0 invisible"
                    }`}
                    onClick={(e) => e.stopPropagation()} // ✅ prevent closing on inner click
                  >
                    {filter.options.map(opt => (
                      <div
                        key={opt}
                        onClick={() => toggleFilter(filter.key, opt)}
                        className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 ${
                          filters[filter.key].includes(opt)
                            ? "bg-indigo-100 text-indigo-700"
                            : ""
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
            onClick={resetFilters}
            className="
                 w-full sm:w-auto px-6 py-3 rounded-full 
                border border-gray-300 
                bg-gradient-to-b from-white to-gray-50 
                text-gray-700 font-medium 
                shadow-sm hover:shadow-md 
                hover:border-indigo-300 hover:text-indigo-600 
                active:scale-[0.97] active:bg-indigo-50
                transition-all duration-200 ease-in-out
                "
                    >
                    🔄 Reset Filters
                    </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTrainings.map((t, i) => (
          <div
            key={t.id}
            ref={el => (fadeRefs.current[i] = el)}
            className="
    bg-white/90 backdrop-blur-sm border border-gray-200 
    p-6 rounded-2xl shadow-sm 
    transition-all duration-300 ease-out 
    transform opacity-0 translate-y-6 
    flex flex-col justify-between
    hover:scale-[1.015]
    hover:shadow-md
    hover:border-indigo-200
    hover:bg-gradient-to-b hover:from-white hover:to-indigo-50/30
  "
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">{t.title}</h3>
            <div className="flex justify-start items-center gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-medium">⏱️ {t.duration}</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">{t.software}</span>
              <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg text-sm font-medium">{t.type}</span>
            </div>
            <p className="text-sm text-gray-600 mt-3 mb-6">{t.description}</p>
            <div className="mt-auto grid grid-cols-2 gap-3 w-full">
              <span className="w-full flex justify-center items-center bg-green-50 text-green-700 py-2 rounded-lg font-medium">{t.price.replace("RM", "RM ")}</span>
              <button
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                onClick={() => openBookingModal(t.tidycalkey, t.title)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn" onClick={closeBookingModal}>
          <div
            className="bg-white rounded-xl shadow-2xl w-[95%] sm:w-[90%] max-w-5xl h-[80vh] flex flex-col overflow-hidden transform transition-all duration-300 scale-95 animate-fadeUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-indigo-700">{modalTitle}</h3>
              <button onClick={closeBookingModal} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>
            <iframe src={modalSrc} className="flex-1 border-none" title="TidyCal Booking"></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

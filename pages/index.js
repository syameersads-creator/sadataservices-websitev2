import Navbar from "@/components/v5/common/Navbar";
import HeroSection from "@/components/v5/home/HeroSection";
import CoreServices from "@/components/v5/home/CoreServices";
import SupportingServices from "@/components/v5/home/SupportingServices";
import ProjectsCarousel from "@/components/v5/home/ProjectsCarousel";
import ClientsSection from "@/components/v5/home/ClientsSection";
import CTASection from "@/components/v5/home/CTASection";
import Footer from "@/components/v5/common/Footer";
import TQpopup from "@/components/v5/popup/TQpopup";

export default function V5Home() {
  return (
    <main className="text-gray-900 bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CoreServices />
      <SupportingServices />
      <ProjectsCarousel />
      <ClientsSection />
      <CTASection />
      <Footer />
      <TQpopup />
    </main>
  );
}

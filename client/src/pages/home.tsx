import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import InteractiveStorytelling from "@/components/interactive-storytelling";
import TimelineSection from "@/components/timeline-section";
import MissionTracker from "@/components/mission-tracker";
import LaunchSimulator from "@/components/launch-simulator";
import OrbitalVisualization from "@/components/orbital-visualization";
import SpaceWeatherTracker from "@/components/space-weather-tracker";
import MissionsSection from "@/components/missions-section";
import AchievementsSection from "@/components/achievements-section";
import LeadersSection from "@/components/leaders-section";
import GallerySection from "@/components/gallery-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative bg-space-blue text-white overflow-x-hidden min-h-screen">
      {/* Fixed cosmic background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          className="w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2024/05/13/211791_tiny.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ minWidth: '100vw', minHeight: '100vh', objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-blue/90 via-cosmic-navy/70 to-space-blue/95 opacity-80" />
      </div>
      
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <StatsSection />
        <InteractiveStorytelling />
        <TimelineSection />
        <MissionTracker />
        <LaunchSimulator />
        <OrbitalVisualization />
        <SpaceWeatherTracker />
        <MissionsSection />
        <AchievementsSection />
        <LeadersSection />
        <GallerySection />
        <Footer />
      </div>
    </div>
  );
}
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
    <div className="bg-space-blue text-white overflow-x-hidden">
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
  );
}

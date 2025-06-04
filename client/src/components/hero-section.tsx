import { motion } from "framer-motion";
import { Play, FlagTriangleRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleBackground from "./particle-background";

export default function HeroSection() {
  const scrollToTimeline = () => {
    const element = document.querySelector("#timeline");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const beginJourney = () => {
    const element = document.querySelector("#timeline");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="https://videos.pexels.com/video-files/4611817/4611817-hd_1920_1080_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-space-blue/80 via-cosmic-navy/60 to-space-blue/90" />
      </div>

      {/* Particle Animation */}
      <ParticleBackground />

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-inter font-bold text-5xl md:text-7xl mb-6"
        >
          <span className="block text-white">Charting India's</span>
          <span className="block gradient-text">
            Voyage from Ground to Galaxy
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          Discover the extraordinary journey of ISRO - from humble beginnings in the 1960s to becoming a global space power
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={beginJourney}
            className="gradient-blue-purple px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          >
            <Play className="mr-2 h-4 w-4" />
            Begin Journey
          </Button>
          <Button
            variant="outline"
            onClick={scrollToTimeline}
            className="border-2 border-isro-gold text-isro-gold bg-transparent px-8 py-4 rounded-lg font-semibold hover:bg-isro-gold hover:text-space-blue transition-all duration-300"
          >
            <FlagTriangleRight className="mr-2 h-4 w-4" />
            Explore FlagTriangleRight
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-2xl text-isro-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

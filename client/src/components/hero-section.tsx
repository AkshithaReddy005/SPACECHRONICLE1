import { motion } from "framer-motion";
import { Play, FlagTriangleRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

// Define the sequence of video URLs
const videoSources = [
  "https://cdn.pixabay.com/video/2022/10/12/134471-759723611_tiny.mp4",
  "https://cdn.pixabay.com/video/2015/08/07/3-135655112_tiny.mp4",
  "https://cdn.pixabay.com/video/2022/08/05/126832-737028191_tiny.mp4",
  "https://cdn.pixabay.com/video/2016/03/31/2619-865412755_tiny.mp4",
  "https://cdn.pixabay.com/video/2024/09/24/233053_tiny.mp4",
];

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const VIDEO_PLAY_DURATION = 7000; // 7 seconds

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.load(); // Ensure the new source loads
      videoElement.play().catch(error => console.error("Error playing video:", error));
    }

    timerRef.current = setTimeout(() => {
      handleVideoEnd();
    }, VIDEO_PLAY_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentVideoIndex]);

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
          ref={videoRef}
          key={videoSources[currentVideoIndex]} // Key to ensure React re-renders the video element
          muted // autoPlay is often blocked if not muted
          playsInline
          // onEnded is removed as timer controls duration
          className="w-full h-full object-cover opacity-60" // Slightly reduced video opacity
          src={videoSources[currentVideoIndex]} // Set the source dynamically
        >
          Your browser does not support the video tag.
        </video>
        
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-['Oxanium'] font-bold text-5xl md:text-7xl mb-6"
          style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.7)' }}
        >
          <span className="block text-slate-200">Charting India's</span>
          <span className="block hero-gradient-text">
            Voyage from Ground to Galaxy
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-['Oxanium'] text-xl md:text-2xl mb-8 text-slate-300"
          style={{ textShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)' }}
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

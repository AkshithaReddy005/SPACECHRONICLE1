import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  audio?: string;
  year: string;
  keyFact: string;
  backgroundVideo?: string;
}

const storyChapters: StoryChapter[] = [
  {
    id: "humble-beginnings",
    title: "Humble Beginnings",
    subtitle: "From Bicycle to Rockets",
    content: "In 1963, Dr. Vikram Sarabhai and Dr. Kalam transported rocket parts on bicycles through the narrow streets of Thumba village. This small fishing village in Kerala would become the birthplace of India's space dreams.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Thumba_Equatorial_Rocket_Launching_Station.jpg/600px-Thumba_Equatorial_Rocket_Launching_Station.jpg",
    year: "1963",
    keyFact: "First rocket launched from a church in Thumba village"
  },
  {
    id: "first-satellite",
    title: "Breaking the Sky Barrier",
    subtitle: "Aryabhatta's Historic Journey",
    content: "Named after the ancient Indian mathematician, Aryabhatta became India's first satellite in 1975. Though communication was lost after 5 days, it marked India's entry into the space age and inspired a generation of scientists.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Aryabhatta_satellite.jpg/400px-Aryabhatta_satellite.jpg",
    year: "1975",
    keyFact: "India's first satellite weighed 360 kg"
  },
  {
    id: "mars-mission",
    title: "The Red Planet Calling",
    subtitle: "Mangalyaan's Impossible Dream",
    content: "In 2014, India achieved what many thought impossible - reaching Mars in the first attempt at just $74 million. The Mars Orbiter Mission proved that frugal engineering and innovative thinking could conquer interplanetary space.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/PSLV-C25_successful_launch.jpg/500px-PSLV-C25_successful_launch.jpg",
    year: "2014",
    keyFact: "Cost less than a Hollywood movie budget"
  },
  {
    id: "moon-south-pole",
    title: "Conquering the Unknown",
    subtitle: "Chandrayaan-3's Historic Landing",
    content: "August 23, 2023 - A day that made India the fourth country to land on the Moon and the first to touch the lunar south pole. The Vikram lander and Pragyan rover opened new chapters in space exploration.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Chandrayaan-3_Mission_logo.png/400px-Chandrayaan-3_Mission_logo.png",
    year: "2023",
    keyFact: "First successful landing near Moon's south pole"
  },
  {
    id: "future-missions",
    title: "Journey to the Stars",
    subtitle: "The Future Beckons",
    content: "With Gaganyaan preparing to carry Indian astronauts to space and Aditya-L1 studying our Sun, ISRO continues to push boundaries. The next frontier: Venus, Jupiter, and beyond the solar system.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Sriharikota_Range_%28SHAR%29.jpg/500px-Sriharikota_Range_%28SHAR%29.jpg",
    year: "2025+",
    keyFact: "Human spaceflight mission Gaganyaan scheduled"
  }
];

export default function InteractiveStorytelling() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentChapter]);

  const handleNext = () => {
    if (currentChapter < storyChapters.length - 1) {
      setCurrentChapter(prev => prev + 1);
      setProgress(0);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
      setProgress(0);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const chapter = storyChapters[currentChapter];

  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
  {/* Starfield background */}
  
      {/* Background particles */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-isro-gold rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6 text-white shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>
  The ISRO Chronicles
</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            An immersive journey through India's greatest space achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-isro-gold to-mission-orange px-4 py-2 rounded-full">
                    <span className="text-space-blue font-bold">{chapter.year}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Chapter {currentChapter + 1} of {storyChapters.length}
                  </div>
                </div>

                <div>
                  <h3 className="font-inter font-bold text-3xl mb-2">{chapter.title}</h3>
                  <p className="text-xl text-stellar-blue font-semibold">{chapter.subtitle}</p>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">{chapter.content}</p>

                <div className="bg-cosmic-navy p-4 rounded-lg border-l-4 border-isro-gold">
                  <p className="text-isro-gold font-semibold">Key Fact:</p>
                  <p className="text-gray-300">{chapter.keyFact}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={togglePlayback}
                  className="gradient-blue-purple"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isPlaying ? "Pause" : "Auto Play"}
                </Button>
                
                <Button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  variant="outline"
                  size="sm"
                >
                  {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentChapter === 0}
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex-1">
                  <Progress value={isPlaying ? progress : (currentChapter / (storyChapters.length - 1)) * 100} />
                </div>

                <Button
                  onClick={handleNext}
                  disabled={currentChapter === storyChapters.length - 1}
                  variant="outline"
                  size="sm"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="flex gap-2 flex-wrap">
              {storyChapters.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentChapter 
                      ? "bg-isro-gold scale-125" 
                      : index < currentChapter 
                      ? "bg-stellar-blue" 
                      : "bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="space-y-6 relative">
            {/* Cosmic animated glow overlay for this section */}
            <div className="absolute -inset-8 z-0 pointer-events-none">
              <div className="w-full h-full animate-gradient-move bg-gradient-to-br from-indigo-900/60 via-fuchsia-800/40 to-blue-900/70 blur-2xl opacity-70 rounded-2xl"></div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="relative overflow-hidden rounded-xl border border-stellar-blue/20 shadow-xl">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-blue/60 to-transparent" />
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-4 right-4 bg-isro-gold/20 backdrop-blur-md px-3 py-1 rounded-full shadow-lg"
                  >
                    <span className="text-isro-gold font-semibold text-sm">{chapter.year}</span>
                  </motion.div>
                </div>
                {/* 3D Effect Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-stellar-blue via-galaxy-purple to-isro-gold rounded-xl opacity-30 blur-md -z-10" />
              </motion.div>
            </AnimatePresence>

            {/* Mini Timeline with cosmic background */}
            <div className="relative z-10 bg-cosmic-navy/90 p-4 rounded-lg shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-fuchsia-800/30 to-blue-900/40 opacity-60 blur-md -z-10"></div>
              <h4 className="font-semibold mb-3 text-center text-isro-gold drop-shadow">Story Timeline</h4>
              <div className="flex justify-between items-center text-xs">
                {storyChapters.map((chap, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      index === currentChapter ? "text-isro-gold scale-110" : "text-gray-400"
                    }`}
                    onClick={() => setCurrentChapter(index)}
                  >
                    <span className="w-2 h-2 rounded-full mb-1 block bg-gradient-to-tr from-isro-gold via-stellar-blue to-galaxy-purple shadow-lg" />
                    <span>{chap.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
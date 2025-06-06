import { motion } from "framer-motion";
import { Flag, Satellite, Moon, Globe, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { timelineData } from "@/lib/data";

const iconMap = {
  flag: Flag,
  satellite: Satellite,
  moon: Moon,
  globe: Globe,
  rocket: Rocket,
};

export default function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="timeline" ref={ref} className="relative py-20">
  {/* Top fade for seamless transition from hero */}
  <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-space-blue/95 to-transparent pointer-events-none z-10" />
      {/* Light cosmic/starfield background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
  {/* Blurry, semi-transparent overlay for premium effect */}
  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
</div>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6 text-white shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>Timeline of Triumph</h2>
<p className="text-xl text-white max-w-3xl mx-auto shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>Journey through the decades of ISRO's groundbreaking achievements and milestones</p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Timeline Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button className="gradient-blue-purple px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
            <Rocket className="mr-2 h-4 w-4" />
            View Complete Timeline
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isVisible,
}: {
  item: any;
  index: number;
  isVisible: boolean;
}) {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex items-center justify-between"
    >
      {/* Left Content */}
      <div className={`w-5/12 ${isLeft ? "text-right pr-8" : ""}`}>
        {isLeft && (
          <div className={`bg-cosmic-navy p-6 rounded-lg border border-${item.borderColor}/30 hover:border-${item.borderColor} transition-all duration-300`}>
            <h3 className="font-inter font-bold text-xl mb-2 text-isro-gold">
              {item.year}
            </h3>
            <h4 className="font-semibold text-lg mb-3">{item.title}</h4>
            <p className="text-gray-300">{item.description}</p>
          </div>
        )}
      </div>

      {/* Center Icon */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-12 h-12 bg-${item.iconColor} rounded-full flex items-center justify-center border-4 border-space-blue ${
            item.animate ? "animate-pulse-slow" : ""
          }`}
        >
          <IconComponent className="text-white h-5 w-5" />
        </motion.div>
      </div>

      {/* Right Content */}
      <div className={`w-5/12 ${!isLeft ? "pl-8" : ""}`}>
        {!isLeft && (
          <div className={`bg-cosmic-navy p-6 rounded-lg border border-${item.borderColor}/30 hover:border-${item.borderColor} transition-all duration-300`}>
            <h3 className="font-inter font-bold text-xl mb-2 text-isro-gold">
              {item.year}
            </h3>
            <h4 className="font-semibold text-lg mb-3">{item.title}</h4>
            <p className="text-gray-300">{item.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

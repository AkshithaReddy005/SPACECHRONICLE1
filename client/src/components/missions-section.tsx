import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { missionsData } from "@/lib/data";

export default function MissionsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="missions" ref={ref} className="py-20 bg-gradient-to-b from-cosmic-navy to-space-blue">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6">
            <span className="bg-gradient-to-r from-isro-gold to-mission-orange bg-clip-text text-transparent">
              Landmark Missions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the groundbreaking missions that defined India's space exploration journey
          </p>
        </motion.div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionsData.map((mission, index) => (
            <MissionCard
              key={index}
              mission={mission}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionCard({
  mission,
  index,
  isVisible,
}: {
  mission: any;
  index: number;
  isVisible: boolean;
}) {
  const statusColors = {
    Success: "bg-green-500",
    Ongoing: "bg-blue-500",
    Active: "bg-yellow-500",
    Upcoming: "bg-purple-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="mission-card bg-cosmic-navy rounded-xl overflow-hidden border border-stellar-blue/20 transition-all duration-300 hover:border-stellar-blue cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={mission.image}
          alt={mission.alt}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-navy/50 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-inter font-bold text-xl">{mission.title}</h3>
          <span className={`${statusColors[mission.status as keyof typeof statusColors]} text-xs px-2 py-1 rounded-full text-white`}>
            {mission.status}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4">{mission.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-isro-gold font-semibold">{mission.year}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-stellar-blue hover:text-white transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

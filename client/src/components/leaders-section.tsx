import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { leadersData } from "@/lib/data";

interface Leader {
  name: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  achievements: string[];
  years: string;
}

interface LeaderCardProps {
  leader: Leader;
  index: number;
  isVisible: boolean;
}

export default function LeadersSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="leaders" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-10 text-center shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>Leaders</h2>
<span className="block text-2xl mb-4 text-white shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>Visionary Leaders</span>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the brilliant minds who shaped India's space program and inspired generations
          </p>
        </motion.div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadersData.map((leader, index) => (
            <LeaderCard
              key={index}
              leader={leader}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderCard({
  leader,
  index,
  isVisible,
}: LeaderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="bg-cosmic-navy rounded-xl p-6 border border-stellar-blue/20 hover:border-stellar-blue transition-all duration-300 group"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={leader.image}
        alt={leader.alt}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-stellar-blue/30 group-hover:border-stellar-blue transition-all duration-300"
      />
      
      <h3 className="font-inter font-bold text-xl text-center mb-2">
        {leader.name}
      </h3>
      
      <p className="text-isro-gold text-center mb-4 font-semibold">
        {leader.title}
      </p>
      
      <p className="text-gray-300 text-sm text-center mb-4">
        {leader.description}
      </p>
      
      <div className="space-y-2 mb-4">
        {leader.achievements?.map((achievement: string, idx) => (
          <div key={idx} className="text-xs bg-stellar-blue/20 px-2 py-1 rounded text-center">
            {achievement}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <span className="text-xs text-gray-400">{leader.years}</span>
      </div>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import { DollarSign, Satellite, Trophy, Moon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { achievementsData, costComparisonData } from "@/lib/data";

const iconMap = {
  dollar: DollarSign,
  satellite: Satellite,
  trophy: Trophy,
  moon: Moon,
};

export default function AchievementsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="achievements" ref={ref} className="py-20 bg-space-blue">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-10 text-center shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>Achievements</h2>
<span className="block text-2xl mb-4 text-white shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-center" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>World Records & Achievements</span>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating the remarkable milestones that put India on the global space map
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {achievementsData.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Global Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-cosmic-navy p-8 rounded-xl border border-stellar-blue/20"
        >
          <h3 className="font-inter font-bold text-2xl mb-6 text-center">
            Global Space Mission Cost Comparison
          </h3>
          <div className="space-y-4">
            {costComparisonData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 w-32">{item.mission}</span>
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${item.cost / 10}px` } : {}}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`${item.color} h-3 rounded-full`}
                  />
                  <span className={`${item.color.replace('bg-', 'text-')} font-semibold w-24`}>
                    ${item.cost}M
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AchievementCard({
  achievement,
  index,
  isVisible,
}: {
  achievement: any;
  index: number;
  isVisible: boolean;
}) {
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`bg-gradient-to-br from-cosmic-navy to-space-blue p-8 rounded-xl border border-${achievement.borderColor}/30 hover:border-${achievement.borderColor} transition-all duration-300`}
    >
      <div className="flex items-start space-x-4">
        <div className={`bg-${achievement.iconColor} p-3 rounded-lg`}>
          <IconComponent className="text-2xl text-white h-6 w-6" />
        </div>
        <div>
          <h3 className="font-inter font-bold text-xl mb-2">{achievement.title}</h3>
          <p className="text-gray-300 mb-4">{achievement.description}</p>
          <div className={`text-${achievement.iconColor} font-semibold`}>
            {achievement.stat}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { useCounter } from "@/hooks/use-counter";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  { value: 104, label: "Successful Missions", color: "text-isro-gold" },
  { value: 380, label: "Satellites Launched", color: "text-stellar-blue" },
  { value: 60, label: "Years of Excellence", color: "text-galaxy-purple" },
  { value: 33, label: "Countries Served", color: "text-mission-orange" },
];

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-cosmic-navy">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              isVisible={isVisible}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  color,
  isVisible,
  delay,
}: {
  value: number;
  label: string;
  color: string;
  isVisible: boolean;
  delay: number;
}) {
  const count = useCounter(value, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className={`text-4xl md:text-5xl font-bold ${color} mb-2`}>
        {count}
      </div>
      <div className="text-sm md:text-base text-gray-300">{label}</div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Satellite, Clock, MapPin, Radio, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LiveMission {
  id: string;
  name: string;
  status: "Active" | "Transit" | "Orbital" | "Landed";
  progress: number;
  location: string;
  lastUpdate: string;
  details: string;
  nextMilestone: string;
  signal: "Strong" | "Moderate" | "Weak";
}

const liveMissions: LiveMission[] = [
  {
    id: "aditya-l1",
    name: "Aditya-L1",
    status: "Transit",
    progress: 78,
    location: "En route to L1 Lagrange Point",
    lastUpdate: "2 hours ago",
    details: "Solar observation mission studying Sun's corona",
    nextMilestone: "L1 orbit insertion",
    signal: "Strong"
  },
  {
    id: "chandrayaan-3",
    name: "Chandrayaan-3",
    status: "Landed",
    progress: 100,
    location: "Moon South Pole",
    lastUpdate: "15 minutes ago",
    details: "Pragyan rover operational, conducting surface analysis",
    nextMilestone: "Extended mission operations",
    signal: "Moderate"
  },
  {
    id: "oceansat-3",
    name: "Oceansat-3",
    status: "Orbital",
    progress: 95,
    location: "Sun-synchronous orbit",
    lastUpdate: "30 minutes ago",
    details: "Ocean color monitoring and coastal zone studies",
    nextMilestone: "Data relay to ground station",
    signal: "Strong"
  }
];

export default function MissionTracker() {
  const [selectedMission, setSelectedMission] = useState<LiveMission>(liveMissions[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Transit": return "bg-blue-500";
      case "Orbital": return "bg-purple-500";
      case "Landed": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getSignalStrength = (signal: string) => {
    switch (signal) {
      case "Strong": return 100;
      case "Moderate": return 60;
      case "Weak": return 30;
      default: return 0;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-space-blue to-cosmic-navy">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6 text-white shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>
  Live Mission Control
</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time tracking of active ISRO missions across the solar system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission List */}
          <div className="lg:col-span-1">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-stellar-blue" />
                  Active Missions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {liveMissions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedMission(mission)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedMission.id === mission.id 
                        ? "bg-stellar-blue/20 border border-stellar-blue" 
                        : "bg-space-blue hover:bg-stellar-blue/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{mission.name}</h3>
                      <Badge className={`${getStatusColor(mission.status)} text-white`}>
                        {mission.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">{mission.location}</div>
                    <Progress value={mission.progress} className="mt-2" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Mission Details */}
          <div className="lg:col-span-2">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Satellite className="h-5 w-5 text-isro-gold" />
                    {selectedMission.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        selectedMission.signal === "Strong" ? "bg-green-500" :
                        selectedMission.signal === "Moderate" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                      <span className="text-sm text-gray-400">Signal: {selectedMission.signal}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mission Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-stellar-blue" />
                      Current Location
                    </h4>
                    <p className="text-gray-300">{selectedMission.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-stellar-blue" />
                      Last Update
                    </h4>
                    <p className="text-gray-300">{selectedMission.lastUpdate}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Mission Progress</h4>
                    <span className="text-isro-gold font-bold">{selectedMission.progress}%</span>
                  </div>
                  <Progress value={selectedMission.progress} className="h-3" />
                </div>

                {/* Mission Details */}
                <div>
                  <h4 className="font-semibold mb-2">Mission Details</h4>
                  <p className="text-gray-300 mb-4">{selectedMission.details}</p>
                  
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-isro-gold" />
                    Next Milestone
                  </h4>
                  <p className="text-isro-gold">{selectedMission.nextMilestone}</p>
                </div>

                {/* Signal Strength */}
                <div>
                  <h4 className="font-semibold mb-2">Communication Signal</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={getSignalStrength(selectedMission.signal)} className="flex-1" />
                    <span className="text-sm">{selectedMission.signal}</span>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="bg-space-blue p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Mission Control Time (IST)</h4>
                  <div className="text-2xl font-mono text-isro-gold">
                    {currentTime.toLocaleTimeString('en-IN', { 
                      timeZone: 'Asia/Kolkata',
                      hour12: false 
                    })}
                  </div>
                  <div className="text-sm text-gray-400">
                    {currentTime.toLocaleDateString('en-IN', { 
                      timeZone: 'Asia/Kolkata',
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
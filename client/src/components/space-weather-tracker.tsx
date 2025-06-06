import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Zap, Shield, Radio, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SpaceWeatherData {
  solarActivity: number;
  geomagneticStorm: "None" | "Minor" | "Moderate" | "Strong" | "Severe";
  radiationLevel: number;
  solarWind: number;
  auroraActivity: "Low" | "Moderate" | "High" | "Very High";
  lastUpdate: string;
}

interface SatelliteHealth {
  name: string;
  status: "Operational" | "Degraded" | "Protected";
  shieldLevel: number;
  affectedSystems: string[];
}

const satellites: SatelliteHealth[] = [
  {
    name: "Chandrayaan-3",
    status: "Operational",
    shieldLevel: 95,
    affectedSystems: []
  },
  {
    name: "Aditya-L1",
    status: "Protected",
    shieldLevel: 85,
    affectedSystems: ["Solar Panel Efficiency"]
  },
  {
    name: "Oceansat-3",
    status: "Operational",
    shieldLevel: 92,
    affectedSystems: []
  },
  {
    name: "Cartosat-3",
    status: "Degraded",
    shieldLevel: 78,
    affectedSystems: ["Communication", "Imaging"]
  }
];

export default function SpaceWeatherTracker() {
  const [weatherData, setWeatherData] = useState<SpaceWeatherData>({
    solarActivity: 45,
    geomagneticStorm: "Minor",
    radiationLevel: 62,
    solarWind: 400,
    auroraActivity: "Moderate",
    lastUpdate: "2 minutes ago"
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        solarActivity: Math.max(0, Math.min(100, prev.solarActivity + (Math.random() - 0.5) * 10)),
        radiationLevel: Math.max(0, Math.min(100, prev.radiationLevel + (Math.random() - 0.5) * 15)),
        solarWind: Math.max(200, Math.min(800, prev.solarWind + (Math.random() - 0.5) * 50)),
        lastUpdate: "Just now"
      }));
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStormColor = (level: string) => {
    switch (level) {
      case "None": return "bg-green-500";
      case "Minor": return "bg-yellow-500";
      case "Moderate": return "bg-orange-500";
      case "Strong": return "bg-red-500";
      case "Severe": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational": return "text-green-500";
      case "Protected": return "text-yellow-500";
      case "Degraded": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getThreatLevel = () => {
    const avgLevel = (weatherData.solarActivity + weatherData.radiationLevel) / 2;
    if (avgLevel < 30) return { level: "Low", color: "text-green-500", icon: Shield };
    if (avgLevel < 60) return { level: "Moderate", color: "text-yellow-500", icon: AlertTriangle };
    return { level: "High", color: "text-red-500", icon: AlertTriangle };
  };

  const threatLevel = getThreatLevel();
  const ThreatIcon = threatLevel.icon;

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
  Space Weather Monitor
</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time monitoring of space weather conditions affecting ISRO satellites
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Conditions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-mission-orange" />
                    Current Space Weather
                  </span>
                  <div className="flex items-center gap-2">
                    <ThreatIcon className={`h-4 w-4 ${threatLevel.color}`} />
                    <span className={`text-sm ${threatLevel.color}`}>
                      {threatLevel.level} Threat
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-mission-orange" />
                      <span className="text-sm text-gray-400">Solar Activity</span>
                    </div>
                    <div className="text-2xl font-bold text-mission-orange">
                      {Math.round(weatherData.solarActivity)}%
                    </div>
                    <Progress value={weatherData.solarActivity} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-galaxy-purple" />
                      <span className="text-sm text-gray-400">Radiation</span>
                    </div>
                    <div className="text-2xl font-bold text-galaxy-purple">
                      {Math.round(weatherData.radiationLevel)}%
                    </div>
                    <Progress value={weatherData.radiationLevel} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-stellar-blue" />
                      <span className="text-sm text-gray-400">Solar Wind</span>
                    </div>
                    <div className="text-2xl font-bold text-stellar-blue">
                      {Math.round(weatherData.solarWind)}
                    </div>
                    <div className="text-xs text-gray-400">km/s</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-isro-gold" />
                      <span className="text-sm text-gray-400">Geomagnetic</span>
                    </div>
                    <Badge className={`${getStormColor(weatherData.geomagneticStorm)} text-white`}>
                      {weatherData.geomagneticStorm}
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-space-blue rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Last Updated:</span>
                    <span className="text-sm text-white">{weatherData.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400">Monitor Time (IST):</span>
                    <span className="text-sm text-isro-gold font-mono">
                      {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts and Warnings */}
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-mission-orange" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherData.geomagneticStorm !== "None" && (
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-500">Geomagnetic Storm Alert</h4>
                        <p className="text-sm text-gray-300">
                          {weatherData.geomagneticStorm} geomagnetic storm detected. Satellite operations may be affected.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {weatherData.radiationLevel > 70 && (
                    <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <Zap className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-500">High Radiation Warning</h4>
                        <p className="text-sm text-gray-300">
                          Elevated radiation levels detected. Satellites entering protective mode.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {weatherData.solarActivity > 80 && (
                    <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <Sun className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-500">Solar Flare Activity</h4>
                        <p className="text-sm text-gray-300">
                          Intense solar activity detected. Communication systems on standby.
                        </p>
                      </div>
                    </div>
                  )}

                  {weatherData.geomagneticStorm === "None" && weatherData.radiationLevel < 50 && weatherData.solarActivity < 60 && (
                    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-500">All Systems Normal</h4>
                        <p className="text-sm text-gray-300">
                          Space weather conditions are favorable for all satellite operations.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Satellite Health */}
          <div className="space-y-6">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-stellar-blue" />
                  Satellite Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {satellites.map((satellite, index) => (
                    <motion.div
                      key={satellite.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-3 bg-space-blue rounded-lg border border-stellar-blue/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{satellite.name}</h4>
                        <span className={`text-xs font-semibold ${getStatusColor(satellite.status)}`}>
                          {satellite.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Shield Integrity</span>
                          <span className="text-white">{satellite.shieldLevel}%</span>
                        </div>
                        <Progress value={satellite.shieldLevel} className="h-1" />
                      </div>

                      {satellite.affectedSystems.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-400 mb-1">Affected Systems:</div>
                          <div className="flex flex-wrap gap-1">
                            {satellite.affectedSystems.map((system, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {system}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="text-sm">Space Weather Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aurora Activity:</span>
                    <span className="text-galaxy-purple">{weatherData.auroraActivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPS Accuracy:</span>
                    <span className="text-green-500">
                      {weatherData.geomagneticStorm === "None" ? "Normal" : "Degraded"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Radio Blackouts:</span>
                    <span className="text-yellow-500">
                      {weatherData.solarActivity > 70 ? "Possible" : "None"}
                    </span>
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
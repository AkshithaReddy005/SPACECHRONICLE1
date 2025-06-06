import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Play, RotateCcw, Gauge, Thermometer, Fuel, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface LaunchStage {
  name: string;
  altitude: number;
  speed: number;
  fuel: number;
  temperature: number;
  description: string;
  duration: number;
}

const launchStages: LaunchStage[] = [
  {
    name: "Pre-Launch",
    altitude: 0,
    speed: 0,
    fuel: 100,
    temperature: 25,
    description: "Final systems check and ignition sequence",
    duration: 3000
  },
  {
    name: "Liftoff",
    altitude: 1,
    speed: 50,
    fuel: 85,
    temperature: 1200,
    description: "Main engines ignited, rocket ascending",
    duration: 2000
  },
  {
    name: "First Stage",
    altitude: 45,
    speed: 1200,
    fuel: 40,
    temperature: 800,
    description: "Solid rocket boosters providing thrust",
    duration: 4000
  },
  {
    name: "Booster Separation",
    altitude: 65,
    speed: 2100,
    fuel: 35,
    temperature: 200,
    description: "Solid boosters jettisoned, core stage continues",
    duration: 1000
  },
  {
    name: "Second Stage",
    altitude: 120,
    speed: 4500,
    fuel: 15,
    temperature: 150,
    description: "Upper stage engine ignition",
    duration: 3000
  },
  {
    name: "Payload Deployment",
    altitude: 180,
    speed: 7800,
    fuel: 5,
    temperature: -50,
    description: "Satellite deployed in orbit",
    duration: 2000
  },
  {
    name: "Mission Success",
    altitude: 200,
    speed: 7850,
    fuel: 2,
    temperature: -80,
    description: "Orbital insertion complete",
    duration: 1000
  }
];

export default function LaunchSimulator() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rocketPosition, setRocketPosition] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLaunching && currentStage < launchStages.length - 1) {
      const stage = launchStages[currentStage];
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentStage(curr => curr + 1);
            return 0;
          }
          return prev + (100 / (stage.duration / 50));
        });
      }, 50);
    } else if (currentStage >= launchStages.length - 1) {
      setIsLaunching(false);
    }
    return () => clearInterval(interval);
  }, [isLaunching, currentStage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (currentStage < 3) {
        skyGradient.addColorStop(0, "#1E3A8A");
        skyGradient.addColorStop(1, "#3B82F6");
      } else {
        skyGradient.addColorStop(0, "#000000");
        skyGradient.addColorStop(1, "#1E3A8A");
      }
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars (for higher altitudes)
      if (currentStage >= 3) {
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ground
      ctx.fillStyle = "#22C55E";
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

      // Launch pad
      ctx.fillStyle = "#6B7280";
      ctx.fillRect(canvas.width / 2 - 30, canvas.height - 60, 60, 10);

      // Rocket
      const rocketX = canvas.width / 2;
      const maxHeight = canvas.height - 80;
      const rocketY = canvas.height - 70 - (maxHeight * (currentStage / launchStages.length));
      
      // Rocket body
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(rocketX - 8, rocketY - 40, 16, 40);
      
      // Rocket nose
      ctx.beginPath();
      ctx.moveTo(rocketX, rocketY - 50);
      ctx.lineTo(rocketX - 8, rocketY - 40);
      ctx.lineTo(rocketX + 8, rocketY - 40);
      ctx.closePath();
      ctx.fill();

      // Flames (if launching)
      if (isLaunching && currentStage > 0 && currentStage < 6) {
        const flameHeight = 20 + Math.random() * 10;
        ctx.fillStyle = "#FF6B35";
        ctx.beginPath();
        ctx.moveTo(rocketX - 6, rocketY);
        ctx.lineTo(rocketX, rocketY + flameHeight);
        ctx.lineTo(rocketX + 6, rocketY);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.moveTo(rocketX - 3, rocketY);
        ctx.lineTo(rocketX, rocketY + flameHeight * 0.7);
        ctx.lineTo(rocketX + 3, rocketY);
        ctx.closePath();
        ctx.fill();
      }

      // Smoke trail
      if (currentStage > 0) {
        ctx.strokeStyle = "#9CA3AF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rocketX, rocketY + 10);
        for (let i = 0; i < 20; i++) {
          const y = rocketY + 10 + i * 5;
          const x = rocketX + Math.sin(i * 0.3) * (i * 0.5);
          if (y < canvas.height - 50) {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [currentStage, isLaunching]);

  const startLaunch = () => {
    setIsLaunching(true);
    setCurrentStage(0);
    setProgress(0);
  };

  const resetSimulation = () => {
    setIsLaunching(false);
    setCurrentStage(0);
    setProgress(0);
  };

  const stage = launchStages[currentStage];

  return (
    <section className="py-20">
  <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-10 text-center shadow-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 0 2px #000'}}>Launch Simulator</h2>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6">
            <span className="bg-gradient-to-r from-mission-orange to-isro-gold bg-clip-text text-transparent">
              Launch Simulator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience a PSLV rocket launch with real-time telemetry and stunning visuals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulation Canvas */}
          <div className="space-y-6">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardContent className="p-0">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex gap-4">
              <Button
                onClick={startLaunch}
                disabled={isLaunching}
                className="gradient-blue-purple flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                {isLaunching ? "Launch in Progress..." : "Start Launch"}
              </Button>
              <Button
                onClick={resetSimulation}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Telemetry Data */}
          <div className="space-y-6">
            {/* Current Stage */}
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-isro-gold" />
                    {stage.name}
                  </span>
                  <Badge className={`${
                    isLaunching ? "bg-green-500" : currentStage === 0 ? "bg-blue-500" : "bg-gray-500"
                  } text-white`}>
                    {isLaunching ? "Active" : currentStage === 0 ? "Ready" : "Complete"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{stage.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Stage Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Telemetry Readings */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-cosmic-navy border-stellar-blue/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-stellar-blue/20 rounded-lg flex items-center justify-center">
                      <span className="text-stellar-blue font-bold text-sm">ALT</span>
                    </div>
                    <span className="text-sm text-gray-400">Altitude</span>
                  </div>
                  <div className="text-2xl font-bold text-stellar-blue">
                    {stage.altitude.toLocaleString()} km
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cosmic-navy border-stellar-blue/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-galaxy-purple" />
                    <span className="text-sm text-gray-400">Velocity</span>
                  </div>
                  <div className="text-2xl font-bold text-galaxy-purple">
                    {stage.speed.toLocaleString()} m/s
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cosmic-navy border-stellar-blue/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Fuel className="h-4 w-4 text-isro-gold" />
                    <span className="text-sm text-gray-400">Fuel</span>
                  </div>
                  <div className="text-2xl font-bold text-isro-gold">
                    {stage.fuel}%
                  </div>
                  <Progress value={stage.fuel} className="mt-1 h-1" />
                </CardContent>
              </Card>

              <Card className="bg-cosmic-navy border-stellar-blue/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-mission-orange" />
                    <span className="text-sm text-gray-400">Temperature</span>
                  </div>
                  <div className="text-2xl font-bold text-mission-orange">
                    {stage.temperature}°C
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mission Timeline */}
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="text-sm">Mission Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {launchStages.map((stageItem, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                        index === currentStage 
                          ? "bg-stellar-blue/20 border border-stellar-blue" 
                          : index < currentStage 
                          ? "bg-green-500/20" 
                          : "bg-gray-800/50"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        index === currentStage 
                          ? "bg-stellar-blue animate-pulse" 
                          : index < currentStage 
                          ? "bg-green-500" 
                          : "bg-gray-600"
                      }`} />
                      <span className={`text-sm flex-1 ${
                        index <= currentStage ? "text-white" : "text-gray-400"
                      }`}>
                        {stageItem.name}
                      </span>
                      {index < currentStage && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
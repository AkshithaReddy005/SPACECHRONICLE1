import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrbitingBody {
  id: string;
  name: string;
  radius: number;
  speed: number;
  color: string;
  size: number;
  description: string;
  status: string;
}

const orbitingBodies: OrbitingBody[] = [
  {
    id: "chandrayaan-3",
    name: "Chandrayaan-3",
    radius: 150,
    speed: 0.02,
    color: "#F59E0B",
    size: 6,
    description: "Lunar mission studying Moon's south pole",
    status: "Active"
  },
  {
    id: "aditya-l1",
    name: "Aditya-L1",
    radius: 200,
    speed: 0.015,
    color: "#2563EB",
    size: 5,
    description: "Solar observation mission at L1 point",
    status: "Transit"
  },
  {
    id: "oceansat-3",
    name: "Oceansat-3",
    radius: 120,
    speed: 0.025,
    color: "#6366F1",
    size: 4,
    description: "Earth observation satellite",
    status: "Operational"
  },
  {
    id: "cartosat-3",
    name: "Cartosat-3",
    radius: 100,
    speed: 0.03,
    color: "#EA580C",
    size: 4,
    description: "High-resolution imaging satellite",
    status: "Active"
  }
];

export default function OrbitalVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedSatellite, setSelectedSatellite] = useState<OrbitingBody | null>(null);
  const [time, setTime] = useState(0);

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
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw Earth
      const earthRadius = 40;
      const earthGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, earthRadius);
      earthGradient.addColorStop(0, "#4F46E5");
      earthGradient.addColorStop(0.7, "#1E40AF");
      earthGradient.addColorStop(1, "#1E3A8A");
      
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw continents (simplified)
      ctx.fillStyle = "#22C55E";
      ctx.beginPath();
      ctx.arc(centerX - 10, centerY - 5, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 8, centerY + 8, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbit paths
      orbitingBodies.forEach(body => {
        ctx.strokeStyle = body.color + "30";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, body.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw satellites
      orbitingBodies.forEach(body => {
        const angle = time * body.speed;
        const x = centerX + Math.cos(angle) * body.radius;
        const y = centerY + Math.sin(angle) * body.radius;

        // Satellite body
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(x, y, body.size, 0, Math.PI * 2);
        ctx.fill();

        // Satellite glow effect
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, body.size * 2);
        glowGradient.addColorStop(0, body.color + "60");
        glowGradient.addColorStop(1, body.color + "00");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, body.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw solar panels (simplified)
        ctx.fillStyle = "#64748B";
        ctx.fillRect(x - body.size * 1.5, y - 1, body.size * 3, 2);
        ctx.fillRect(x - 1, y - body.size * 1.5, 2, body.size * 3);

        // Label
        if (selectedSatellite?.id === body.id) {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "12px Inter";
          ctx.textAlign = "center";
          ctx.fillText(body.name, x, y - body.size - 10);
        }
      });

      setTime(prev => prev + 1);
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isPlaying, selectedSatellite, time]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Check which satellite was clicked
    orbitingBodies.forEach(body => {
      const angle = time * body.speed;
      const x = centerX + Math.cos(angle) * body.radius;
      const y = centerY + Math.sin(angle) * body.radius;
      
      const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
      if (distance <= body.size + 5) {
        setSelectedSatellite(body);
      }
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setTime(0);
    setSelectedSatellite(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cosmic-navy to-space-blue">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-inter font-bold text-4xl md:text-5xl mb-6">
            <span className="bg-gradient-to-r from-isro-gold to-mission-orange bg-clip-text text-transparent">
              3D Orbital Visualization
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive real-time visualization of ISRO satellites orbiting Earth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-stellar-blue" />
                  Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    onClick={togglePlayback}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button
                    onClick={resetAnimation}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  Click on any satellite to view details. Use controls to pause or reset the animation.
                </p>
              </CardContent>
            </Card>

            {/* Satellite List */}
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardHeader>
                <CardTitle>Active Satellites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orbitingBodies.map((body) => (
                  <motion.div
                    key={body.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedSatellite(body)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedSatellite?.id === body.id 
                        ? "bg-stellar-blue/20 border border-stellar-blue" 
                        : "bg-space-blue hover:bg-stellar-blue/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{body.name}</span>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: body.color }}
                      />
                    </div>
                    <Badge className="text-xs">{body.status}</Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Selected Satellite Details */}
            {selectedSatellite && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-cosmic-navy border-stellar-blue/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: selectedSatellite.color }}
                      />
                      {selectedSatellite.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-3">
                      {selectedSatellite.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge>{selectedSatellite.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orbital Radius:</span>
                        <span>{selectedSatellite.radius * 10} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orbital Speed:</span>
                        <span>{(selectedSatellite.speed * 1000).toFixed(1)} km/s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* 3D Visualization Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-cosmic-navy border-stellar-blue/20">
              <CardContent className="p-0">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full h-96 cursor-pointer rounded-lg"
                  style={{ background: "radial-gradient(circle, #1A2332 0%, #0B1426 100%)" }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
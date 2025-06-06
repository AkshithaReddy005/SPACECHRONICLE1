import React, { useState, useEffect } from 'react';

// Define the structure for a design idea
export interface DesignIdea {
  id: string;
  title: string;
  creatorName: string;
  creatorEmail?: string;
  category: string;
  description: string;
  imageUrl: string; // For MVP, this might be a user-provided URL or a placeholder
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected'; // For future moderation features
}

import DesignCard from './design-card'; // Import the new DesignCard component

// Mock data for initial display - replace with actual data fetching/storage later
const mockDesignIdeas: DesignIdea[] = [
  {
    id: '1',
    title: 'Modular Lunar Habitat Concept',
    creatorName: 'Aisha Sharma',
    category: 'Space Habitats',
    description: 'A concept for a modular habitat system designed for rapid deployment and expansion on the lunar surface, utilizing local regolith for 3D printed structural components. This innovative approach aims to maximize self-sufficiency and minimize reliance on Earth-based supplies, paving the way for sustainable long-term human presence on the Moon.',
    imageUrl: 'https://images.unsplash.com/photo-1582730469036-7d0993499331?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHVuYXIlMjBoYWJpdGF0fGVufDB8fDB8fHww',
    submittedAt: new Date('2024-05-15T10:00:00Z'),
    status: 'approved',
  },
  {
    id: '2',
    title: 'Reusable Single-Stage-to-Orbit Rocket',
    creatorName: 'Rohan Verma',
    category: 'Launch Vehicles',
    description: 'Design for a fully reusable SSTO launch vehicle using advanced hybrid engine technology and lightweight composite materials, aimed at reducing launch costs significantly. The vehicle features autonomous landing capabilities and a quick turnaround time for frequent flight schedules.',
    imageUrl: 'https://images.unsplash.com/photo-1630584184700-749678f085c9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnV0dXJpc3RpYyUyMHJvY2tldHxlbnwwfHwwfHx8MA%3D%3D',
    submittedAt: new Date('2024-05-20T14:30:00Z'),
    status: 'approved',
  },
  {
    id: '3',
    title: 'AI-Powered Asteroid Mining Drone Swarm',
    creatorName: 'Priya Singh',
    category: 'Robotics & Rovers',
    description: 'A fleet of autonomous drones utilizing AI for collaborative asteroid prospecting and resource extraction. Each drone is equipped with advanced sensors and mining tools, capable of operating in harsh space environments with minimal human intervention.',
    imageUrl: 'https://images.unsplash.com/photo-1614726398000-7974dec95072?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXN0ZXJvaWQlMjBtaW5pbmd8ZW58MHx8MHx8fDA%3D',
    submittedAt: new Date('2024-06-01T09:20:00Z'),
    status: 'pending',
  },
  {
    id: '4',
    title: 'Interstellar Probe with Solar Sail Propulsion',
    creatorName: 'Dr. Ken Alvares',
    category: 'Satellites & Probes',
    description: 'A concept for a lightweight interstellar probe powered by an advanced solar sail, designed to reach nearby star systems. The probe would carry a suite of miniaturized instruments for exoplanet detection and interstellar medium analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1529702573085-300758451d3e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBzYWlsfGVufDB8fDB8fHww',
    submittedAt: new Date('2024-06-05T11:00:00Z'),
    status: 'approved',
  },
];

const InnovateSpaceHub: React.FC = () => {
  const [designIdeas, setDesignIdeas] = useState<DesignIdea[]>([]);

  useEffect(() => {
    // In a real app, fetch from API or localStorage
    // For now, using mock data
    setDesignIdeas(mockDesignIdeas);
  }, []);

  return (
    <section id="innovate-space" className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-oxanium hero-gradient-text mb-4">
            InnovateSpace Hub
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Share your groundbreaking space designs and concepts with the world. Explore ideas that could shape the future of space exploration.
          </p>
          <button 
            onClick={() => alert('Submission form modal will open here!')} // Placeholder for modal opening
            className="bg-stellar-cyan hover:bg-stellar-blue text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg font-oxanium shadow-lg hover:shadow-stellar-cyan/50"
          >
            Submit Your Design
          </button>
        </div>

        {/* Design Gallery will be rendered here */}
        {designIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {designIdeas.map((idea) => (
              <DesignCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-12 text-lg">No designs submitted yet. Be the first to innovate!</p>
        )}

        {/* Submission Form will be rendered here (perhaps in a modal) */}

      </div>
    </section>
  );
};

export default InnovateSpaceHub;

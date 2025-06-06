import React from 'react';
import { DesignIdea } from './innovate-space-hub'; // Assuming DesignIdea is exported from here

interface DesignCardProps {
  idea: DesignIdea;
}

const DesignCard: React.FC<DesignCardProps> = ({ idea }) => {
  // Placeholder for view details functionality
  const handleViewDetails = () => {
    alert(`Viewing details for: ${idea.title}`);
    // Later, this will open a modal or navigate to a detail page
  };

  return (
    <div className="bg-stellar-card-bg border border-stellar-blue/30 rounded-lg shadow-xl hover:shadow-stellar-blue/50 transition-all duration-300 flex flex-col overflow-hidden h-full">
      <div className="relative w-full h-56 overflow-hidden">
        <img 
          src={idea.imageUrl}
          alt={`Visual concept for ${idea.title}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {idea.status === 'pending' && (
          <span className="absolute top-2 right-2 bg-yellow-500/80 text-white text-xs font-semibold px-2 py-1 rounded">
            Pending Review
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-oxanium text-stellar-cyan mb-2 leading-tight">{idea.title}</h3>
        <p className="text-sm text-gray-400 mb-1">By: <span className="font-semibold text-gray-300">{idea.creatorName}</span></p>
        <p className="text-sm text-stellar-gold mb-4">Category: <span className="font-semibold">{idea.category}</span></p>
        <p className="text-gray-300 text-base mb-5 line-clamp-4 flex-grow">
          {idea.description}
        </p>
        <button 
          onClick={handleViewDetails}
          className="mt-auto bg-transparent border-2 border-stellar-cyan text-stellar-cyan hover:bg-stellar-cyan hover:text-black font-semibold py-2 px-4 rounded-md transition-colors duration-300 w-full font-oxanium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default DesignCard;

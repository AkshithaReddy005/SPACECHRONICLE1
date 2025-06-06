import React, { useState } from 'react';
import { DesignIdea } from './innovate-space-hub'; // Assuming DesignIdea is exported

interface DesignSubmissionFormProps {
  onSubmit: (idea: Omit<DesignIdea, 'id' | 'submittedAt' | 'status'>) => void;
  onClose: () => void;
}

const designCategories = [
  "Launch Vehicles",
  "Satellites & Probes",
  "Space Habitats",
  "Mission Concepts",
  "Robotics & Rovers",
  "Space Art & Visualization",
  "Theoretical Concepts",
  "Other"
];

const DesignSubmissionForm: React.FC<DesignSubmissionFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [category, setCategory] = useState(designCategories[0]);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !creatorName || !category || !description || !imageUrl) {
      setError('Please fill in all required fields.');
      return;
    }
    // Basic URL validation for imageUrl
    try {
      new URL(imageUrl);
    } catch (_) {
      setError('Please enter a valid URL for the image.');
      return;
    }
    setError('');
    onSubmit({
      title,
      creatorName,
      creatorEmail,
      category,
      description,
      imageUrl,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-stellar-card-bg p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-stellar-blue/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-oxanium text-stellar-cyan">Submit Your Design Idea</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        
        {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Project Title <span className="text-red-400">*</span></label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-stellar-cyan focus:border-stellar-cyan shadow-sm"
              required 
            />
          </div>

          <div>
            <label htmlFor="creatorName" className="block text-sm font-medium text-gray-300 mb-1">Your Name/Alias <span className="text-red-400">*</span></label>
            <input 
              type="text" 
              id="creatorName" 
              value={creatorName} 
              onChange={(e) => setCreatorName(e.target.value)} 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-stellar-cyan focus:border-stellar-cyan shadow-sm"
              required 
            />
          </div>

          <div>
            <label htmlFor="creatorEmail" className="block text-sm font-medium text-gray-300 mb-1">Your Email (Optional, Private)</label>
            <input 
              type="email" 
              id="creatorEmail" 
              value={creatorEmail} 
              onChange={(e) => setCreatorEmail(e.target.value)} 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-stellar-cyan focus:border-stellar-cyan shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category <span className="text-red-400">*</span></label>
            <select 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-stellar-cyan focus:border-stellar-cyan shadow-sm"
              required
            >
              {designCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">Image URL <span className="text-red-400">*</span> (e.g., link from Imgur, Flickr)</label>
            <input 
              type="url" 
              id="imageUrl" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="https://example.com/your-image.jpg"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-stellar-cyan focus:border-stellar-cyan shadow-sm"
              required 
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Detailed Description <span className="text-red-400">*</span></label>
            <textarea 
              id="description" 
              rows={6} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-stellar-cyan focus:border-stellar-cyan shadow-sm"
              required 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-stellar-cyan hover:bg-stellar-blue text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg font-oxanium shadow-md hover:shadow-stellar-cyan/50"
            >
              Submit Idea
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg font-oxanium shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignSubmissionForm;

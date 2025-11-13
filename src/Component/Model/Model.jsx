import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Authcontext';
import { Link } from 'react-router';
import './Model.css';

const Model = () => {
  const { modelData } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter models based on search term and createdAt
  const filteredModels = modelData
    .filter((item) => item.createdAt) // only items with createdAt
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.useCase.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section className="meet-experts w-full min-h-screen bg-[#11190C] p-6">
      <h2 className="section-title text-white text-3xl font-bold mb-6">Meet POPULAR MODEL</h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg outline-none border border-gray-600 bg-gray-900 text-white placeholder-gray-400"
        />
      </div>

      {/* Model Cards */}
      <div className="expert-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredModels.length > 0 ? (
          filteredModels.map((expert) => (
            <Link
              to={`/MODEL/${expert._id}`}
              key={expert._id || expert.id}
              className="expert-card bg-gray-800 rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={expert.image || '/default-model.png'} // fallback image
                alt={expert.name}
                className="expert-image w-32 h-32 object-contain rounded-lg mb-3"
              />
              <h3 className="expert-name text-green-400 font-semibold text-lg">{expert.name}</h3>
              <p className="expert-title text-gray-300 text-sm">{expert.useCase}</p>
            </Link>
          ))
        ) : (
          <p className="no-data text-white text-center col-span-full mt-10">
            No models found.
          </p>
        )}
      </div>
    </section>
  );
};

export default Model;

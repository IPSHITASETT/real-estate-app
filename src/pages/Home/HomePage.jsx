import React, { useState } from 'react';
import HeroSection from '../../components/property/HeroSection';
import PropertyList from '../../components/property/PropertyList';
import PremiumPropertyCard from '../../components/property/PremiumPropertyCard';
import MapView from '../../components/property/MapView';
import './HomePage.css';

const HomePage = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  return (
    <>
      <HeroSection />
      
      {/* Property Listings Section */}
      <section className="properties-section">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <p>Explore our handpicked properties for you</p>
        </div>
        
        {/* View Toggle */}
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            🗺️ Map View
          </button>
        </div>

        {/* Conditional Rendering based on view mode */}
        {viewMode === 'list' ? (
          <PropertyList />
        ) : (
          <MapView />
        )}
      </section>

      {/* Premium Property Card */}
      <PremiumPropertyCard />
    </>
  );
};

export default HomePage;

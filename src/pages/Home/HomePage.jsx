import React from 'react';
import HeroSection from '../../components/property/HeroSection';
import PropertyFilters from '../../components/property/PropertyFilters';
import PropertyList from '../../components/property/PropertyList';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      
      {/* Property Listings Section */}
      <section className="properties-section">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <p>Explore our handpicked properties for you</p>
        </div>
        <PropertyFilters />
        <PropertyList />
      </section>
    </>
  );
};

export default HomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import './PropertyTypesSection.css';

const PropertyTypesSection = () => {
  const navigate = useNavigate();
  const { allProperties } = usePropertyContext();

  // Get unique property types
  const propertyTypes = [
    { type: 'Residential Apartment', icon: '🏢', color: '#1976d2' },
    { type: 'Villa', icon: '🏰', color: '#9c27b0' },
    { type: 'Independent House', icon: '🏠', color: '#4caf50' },
    { type: 'Office Space', icon: '🏛️', color: '#ff9800' },
    { type: 'Commercial Space', icon: '🏬', color: '#e91e63' },
    { type: 'Residential Land', icon: '🌳', color: '#795548' },
    { type: 'Penthouse', icon: '🌟', color: '#00bcd4' },
  ];

  const handleExplore = (type) => {
    navigate(`/properties?type=${encodeURIComponent(type)}`);
  };

  return (
    <section className="property-types-section">
      <div className="section-header">
        <h2>Browse by Property Type</h2>
        <p>Find your perfect property type</p>
      </div>

      <div className="property-types-grid">
        {propertyTypes.map(({ type, icon, color }) => {
          // Get count of properties for this type
          const count = allProperties.filter(
            p => p.type === type && p.isApproved
          ).length;

          // Get a sample property image for the card
          const sampleProperty = allProperties.find(
            p => p.type === type && p.isApproved
          );

          return (
            <div 
              key={type} 
              className="property-type-card"
              style={{ '--type-color': color }}
              onClick={() => handleExplore(type)}
            >
              <div className="type-card-image">
                {sampleProperty ? (
                  <img src={sampleProperty.image} alt={type} />
                ) : (
                  <div className="type-card-placeholder">{icon}</div>
                )}
                <div className="type-card-overlay"></div>
              </div>
              <div className="type-card-content">
                <span className="type-icon">{icon}</span>
                <h3>{type}</h3>
                <p className="type-count">{count} Properties</p>
                <button className="explore-type-btn">
                  Explore →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PropertyTypesSection;
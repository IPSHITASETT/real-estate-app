import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import './PropertyList.css';

const PropertyList = ({ showViewAll = true, limit = 8 }) => {
  const { filteredProperties } = usePropertyContext();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayProperties = limit ? filteredProperties.slice(0, limit) : filteredProperties;
  const cardsPerView = 4;
  const maxIndex = Math.max(0, displayProperties.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - cardsPerView));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + cardsPerView));
  };

  const handleViewAll = () => {
    navigate('/properties');
  };

  if (!filteredProperties || filteredProperties.length === 0) {
    return (
      <div className="property-list">
        <p className="no-properties">No properties found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="property-list-container">
      {showViewAll && (
        <div className="property-list-header">
          <h3>{filteredProperties.length} Properties Found</h3>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All Properties →
          </button>
        </div>
      )}

      <div className="carousel-wrapper">
        {displayProperties.length > cardsPerView && (
          <button 
            className="carousel-btn prev" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
          >
            ‹
          </button>
        )}
        
        <div className="carousel-viewport">
          <div 
            className="carousel-track"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
            }}
          >
            {displayProperties.map(property => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                </div>
                <div className="property-details">
                  <h3>{property.title}</h3>
                  <p className="property-location">{property.location}</p>
                  <p className="property-price">{property.priceLabel}</p>
                  <div className="property-features">
                    <span>🛏 {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>📐 {property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {displayProperties.length > cardsPerView && (
          <button 
            className="carousel-btn next" 
            onClick={handleNext} 
            disabled={currentIndex >= maxIndex}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import './PropertyList.css';

const PropertyList = ({ showViewAll = true, limit = 8 }) => {
  const { filteredProperties, toggleWishlist, isInWishlist, filters } = usePropertyContext();
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

  const buildQueryString = (filters) => {
    const params = new URLSearchParams();
    if (filters.city) params.set('city', filters.city);
    if (filters.configuration?.length) params.set('configuration', filters.configuration.join(','));
    if (filters.possession?.length) params.set('possession', filters.possession.join(','));
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.isPremium) params.set('isPremium', 'true');
    if (filters.type) params.set('type', filters.type);
    return params.toString();
  };

  const handleViewAll = () => {
    const queryString = buildQueryString(filters);
    navigate(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  const handleWishlistClick = (e, propertyId) => {
    e.stopPropagation();
    toggleWishlist(propertyId);
  };

  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
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
              <div 
                key={property.id} 
                className="property-card"
                onClick={() => handleCardClick(property.id)}
              >
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <button 
                    className={`wishlist-btn ${isInWishlist(property.id) ? 'active' : ''}`}
                    onClick={(e) => handleWishlistClick(e, property.id)}
                    title={isInWishlist(property.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isInWishlist(property.id) ? '❤️' : '🤍'}
                  </button>
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
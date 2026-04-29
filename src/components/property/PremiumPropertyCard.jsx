import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import './PremiumPropertyCard.css';

const PremiumPropertyCard = () => {
  const navigate = useNavigate();
  const { allProperties } = usePropertyContext();
  
  // Get a random premium property
  const premiumProperties = allProperties.filter(p => p.isPremium && p.isApproved);
  const featuredProperty = premiumProperties[Math.floor(Math.random() * premiumProperties.length)];

  const handleExplore = () => {
    navigate('/properties?isPremium=true');
  };

  if (!featuredProperty) return null;

  return (
    <div className="premium-card-container">
      <div className="premium-card" onClick={handleExplore}>
        <div className="premium-card-image">
          <img src={featuredProperty.image} alt={featuredProperty.title} />
          <div className="premium-overlay"></div>
        </div>
        <span className="premium-badge">Premium</span>
        <div className="premium-card-content">
          <h2>Top Express Picks in Premium Housing</h2>
          <p className="premium-description">
            Discover our handpicked selection of luxury properties in prime locations. 
            From spacious apartments to elegant villas, find your dream home with exclusive amenities 
            and world-class facilities. Experience the finest living standards with our premium listings.
          </p>
          <button className="explore-btn" onClick={handleExplore}>
            Explore Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPropertyCard;
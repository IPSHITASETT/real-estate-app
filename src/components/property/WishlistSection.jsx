import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import './WishlistSection.css';

const WishlistSection = () => {
  const navigate = useNavigate();
  const { wishlist, allProperties, removeFromWishlist } = usePropertyContext();

  // Get wishlist properties
  const wishlistProperties = allProperties.filter(p => wishlist.includes(p.id));

  const handleRemove = (e, propertyId) => {
    e.stopPropagation();
    removeFromWishlist(propertyId);
  };

  const handleViewAll = () => {
    navigate('/properties');
  };

  if (wishlistProperties.length === 0) {
    return null;
  }

  return (
    <section className="wishlist-section">
      <div className="section-header">
        <h2>❤️ Your Wishlist</h2>
        <p>Properties you've saved</p>
      </div>

      <div className="wishlist-grid">
        {wishlistProperties.map(property => (
          <div key={property.id} className="wishlist-card">
            <div className="wishlist-image">
              <img src={property.image} alt={property.title} />
              <button 
                className="remove-wishlist-btn"
                onClick={(e) => handleRemove(e, property.id)}
                title="Remove from wishlist"
              >
                ✕
              </button>
            </div>
            <div className="wishlist-details">
              <h3>{property.title}</h3>
              <p className="wishlist-location">{property.location}</p>
              <p className="wishlist-price">{property.priceLabel}</p>
              <div className="wishlist-features">
                <span>🛏 {property.bedrooms} Beds</span>
                <span>🚿 {property.bathrooms} Baths</span>
                <span>📐 {property.sqft} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WishlistSection;
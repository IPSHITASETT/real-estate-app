import React from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import './PropertyList.css';

const PropertyList = () => {
  const { filteredProperties } = usePropertyContext();

  if (!filteredProperties || filteredProperties.length === 0) {
    return (
      <div className="property-list">
        <p className="no-properties">No properties found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      {filteredProperties.map(property => (
        <div key={property.id} className="property-card">
          <div className="property-image">
            <img src={property.image} alt={property.title} />
          </div>
          <div className="property-details">
            <h3>{property.title}</h3>
            <p className="property-location">{property.location}</p>
            <p className="property-price">{property.priceLabel}</p>
            <div className="property-features">
              <span>{property.bedrooms} Beds</span>
              <span>{property.bathrooms} Baths</span>
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
import React from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import './MapView.css';

const MapView = () => {
  const { filteredProperties } = usePropertyContext();

  // Mock map center - India
  const mapCenter = { lat: 19.0760, lng: 72.8777 }; // Mumbai

  return (
    <div className="map-view-container">
      <div className="map-wrapper">
        {/* Mock Google Map using iframe */}
        <iframe
          title="Property Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120000!2d${mapCenter.lng}!3d${mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM5cKwMDQnNDguMCJOIDcysDUyJzQ1LjAiVw!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin`}
        />
      </div>
      
      {/* Property Markers List */}
      <div className="map-property-list">
        <h3>{filteredProperties.length} Properties in this area</h3>
        <div className="map-properties-scroll">
          {filteredProperties.slice(0, 10).map(property => (
            <div key={property.id} className="map-property-card">
              <img src={property.image} alt={property.title} />
              <div className="map-property-info">
                <h4>{property.title}</h4>
                <p className="map-price">{property.priceLabel}</p>
                <p className="map-location">{property.locality}, {property.city}</p>
                <span className="map-config">{property.configuration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
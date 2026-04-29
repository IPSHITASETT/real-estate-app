import React from 'react';
import img1 from '../../assets/properties/property1.jpg';
import img2 from '../../assets/properties/property2.jpg';
import img3 from '../../assets/properties/property3.jpg';
import './PropertyList.css';

const PropertyList = () => {
  const properties = [
    {
      id: 1,
      title: 'Modern Apartment',
      location: 'Downtown, City Center',
      price: '$250,000',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: img1
    },
    {
      id: 2,
      title: 'Luxury Villa',
      location: 'Suburban Area',
      price: '$550,000',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      image: img2
    },
    {
      id: 3,
      title: 'Cozy Cottage',
      location: 'Green Valley',
      price: '$180,000',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
      image: img3
    }
  ];

  return (
    <div className="property-list">
      {properties.map(property => (
        <div key={property.id} className="property-card">
          <div className="property-image">
            {/* <div className="property-image-placeholder">Property Image</div> */}
            <img src={property.image} alt={property.title} />
          </div>
          <div className="property-details">
            <h3>{property.title}</h3>
            <p className="property-location">{property.location}</p>
            <p className="property-price">{property.price}</p>
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
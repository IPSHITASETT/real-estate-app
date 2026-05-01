import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import './SellerDashboard.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const { addProperty } = usePropertyContext();
  const { user } = useAuthContext();
  const { notify } = useNotificationContext();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    city: '',
    state: '',
    locality: '',
    phone: '',
    type: 'Residential Apartment',
    configuration: '2BHK',
    bedrooms: 2,
    bathrooms: 2,
    sqft: '',
    possession: 'Ready',
    buildingVideoUrl: '',
    flatVideoUrl: '',
    isPremium: false,
    payRegistrationFee: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files?.[0]?.name || ''
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.location || !formData.city) {
      notify.error('Please fill in all required fields');
      return;
    }

    const newProperty = {
      ...formData,
      sellerId: user?.id,
      price: parseInt(formData.price),
      sqft: parseInt(formData.sqft) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      image: formData.image || '/default-property.jpg',
      priceLabel: `₹${formData.price}`,
      isPremium: formData.isPremium,
    };

    addProperty(newProperty);
    notify.success('Property added successfully! Awaiting admin approval.');
    
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      city: '',
      state: '',
      locality: '',
      phone: '',
      type: 'Residential Apartment',
      configuration: '2BHK',
      bedrooms: 2,
      bathrooms: 2,
      sqft: '',
      possession: 'Ready',
      buildingVideoUrl: '',
      flatVideoUrl: '',
      isPremium: false,
      payRegistrationFee: false,
    });

    navigate('/seller');
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: 32 }}>
        <h1>Add New Property</h1>
        <p style={{ color: '#555' }}>
          List your property to reach thousands of potential buyers. Fill in the details below.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 30, borderRadius: 16, border: '1px solid #e0e0e0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 24 }}>
          {/* Basic Info */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Property Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., 2BHK Apartment in Central Mumbai"
              required
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 50,00,000"
              required
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Property Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            >
              <option>Residential Apartment</option>
              <option>Residential House</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Configuration *</label>
            <select
              name="configuration"
              value={formData.configuration}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            >
              <option>1BHK</option>
              <option>2BHK</option>
              <option>3BHK</option>
              <option>4BHK</option>
              <option>5BHK</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g., Mumbai"
              required
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Downtown"
              required
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Locality</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              placeholder="e.g., Bandra"
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="e.g., Maharashtra"
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Square Feet (Sq.Ft.)</label>
            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleInputChange}
              placeholder="e.g., 1200"
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Possession</label>
            <select
              name="possession"
              value={formData.possession}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            >
              <option>Ready</option>
              <option>6 months</option>
              <option>1 year</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Contact Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g., +91 9876543210"
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the property features, amenities, etc."
            rows="5"
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
          />
        </div>

        {/* Video URLs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Building Video URL</label>
            <input
              type="url"
              name="buildingVideoUrl"
              value={formData.buildingVideoUrl}
              onChange={handleInputChange}
              placeholder="e.g., https://..."
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Flat Video URL</label>
            <input
              type="url"
              name="flatVideoUrl"
              value={formData.flatVideoUrl}
              onChange={handleInputChange}
              placeholder="e.g., https://..."
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d0d0d0', fontSize: 14 }}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div style={{ marginBottom: 24, display: 'flex', gap: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleInputChange}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <span>Mark as Premium Property</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="payRegistrationFee"
              checked={formData.payRegistrationFee}
              onChange={handleInputChange}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <span>Pay Registration Fee</span>
          </label>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Add Property
          </button>
          <button
            type="button"
            onClick={() => navigate('/seller')}
            style={{
              padding: '12px 24px',
              background: '#e0e0e0',
              color: '#333',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;

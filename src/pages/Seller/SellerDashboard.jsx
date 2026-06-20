import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const { allProperties, addProperty } = usePropertyContext();
  const { user } = useAuthContext();
  const { notify } = useNotificationContext();
  
  // Get seller's properties
  const sellerProperties = allProperties.filter(p => p.sellerId === user?.id);
  const sellerInquiries = sellerProperties.flatMap(property =>
    (property.inquiries || [])
      .filter(i => i.type === 'inquiry')
      .map(inquiry => ({ ...inquiry, property }))
  );
  const sellerAppointments = sellerProperties.flatMap(property =>
    (property.inquiries || []).filter(i => i.type === 'appointment').map(appointment => ({ ...appointment, property }))
  );

  const [showAddForm, setShowAddForm] = useState(false);
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
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if registration fee is required
    if (formData.payRegistrationFee) {
      // In a real app, this would process payment
      notify.success('Registration fee paid! ₹500');
    }
    
    // Calculate price label
    const price = Number(formData.price);
    const priceLabel = price >= 10000000 
      ? `₹${(price / 10000000).toFixed(2)} Cr`
      : price >= 100000 
        ? `₹${(price / 100000).toFixed(2)} L`
        : `₹${price.toLocaleString()}`;
    
    const newProperty = {
      ...formData,
      sellerId: user?.id,
      sellerName: user?.name,
      price,
      priceLabel,
      state: formData.state,
      phone: formData.phone || user?.email,
      buildingVideo: formData.buildingVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      flatVideo: formData.flatVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      isApproved: false, // Requires admin approval
      inquiries: [],
      appointments: [],
    };
    
    addProperty(newProperty);
    notify.success('Property listed successfully! Waiting for approval.');
    setShowAddForm(false);
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
      videoFile: '',
      isPremium: false,
      payRegistrationFee: false,
    });
  };

  // Stats
  const stats = {
    total: sellerProperties.length,
    approved: sellerProperties.filter(p => p.isApproved).length,
    pending: sellerProperties.filter(p => !p.isApproved).length,
    premium: sellerProperties.filter(p => p.isPremium).length,
    totalViews: sellerProperties.reduce((sum, p) => sum + (p.views || 0), 0),
    totalInquiries: sellerInquiries.length,
    totalAppointments: sellerAppointments.length,
  };

  return (
    <div className="seller-dashboard">
      <div className="seller-header">
        <h1>Seller Dashboard</h1>
        <p>Manage your properties and track performance</p>
      </div>

      {/* Stats */}
      <div className="seller-stats">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Listings</p>
          </div>
        </div>
        <div className="stat-card approved">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card premium">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.premium}</h3>
            <p>Premium</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁</div>
          <div className="stat-content">
            <h3>{stats.totalViews}</h3>
            <p>Total Views</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3>{stats.totalInquiries}</h3>
            <p>Inquiries Received</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.totalAppointments}</h3>
            <p>Appointments</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="seller-actions">
        <button className="add-property-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '✕ Cancel' : '+ Add New Property'}
        </button>
      </div>

      {/* Add Property Form */}
      {showAddForm && (
        <div className="add-property-form">
          <h2>List New Property</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Property Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury 3BHK Apartment in Koramangala"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="Residential Apartment">Residential Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Office Space">Office Space</option>
                    <option value="Commercial Space">Commercial Space</option>
                    <option value="Residential Land">Residential Land</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Configuration</label>
                  <select name="configuration" value={formData.configuration} onChange={handleInputChange}>
                    <option value="1BHK">1 BHK</option>
                    <option value="2BHK">2 BHK</option>
                    <option value="3BHK">3 BHK</option>
                    <option value="4BHK">4 BHK</option>
                    <option value="5BHK">5+ BHK</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 5000000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Location</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangalore"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Karnataka"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Locality</label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                    placeholder="e.g., Koramangala"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +91-9876543210"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Full Address</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Complete address"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Property Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Square Feet</label>
                  <input
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="form-group">
                  <label>Possession</label>
                  <select name="possession" value={formData.possession} onChange={handleInputChange}>
                    <option value="Ready">Ready to Move</option>
                    <option value="6 months">Within 6 Months</option>
                    <option value="1 year">Within 1 Year</option>
                    <option value="2 years">Within 2 Years</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Upload Videos</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Building & Locality Video URL</label>
                  <input
                    type="text"
                    name="buildingVideoUrl"
                    value={formData.buildingVideoUrl}
                    onChange={handleInputChange}
                    placeholder="YouTube embed URL or video link"
                  />
                </div>
                <div className="form-group">
                  <label>Sample Flat Video URL</label>
                  <input
                    type="text"
                    name="flatVideoUrl"
                    value={formData.flatVideoUrl}
                    onChange={handleInputChange}
                    placeholder="YouTube embed URL or video link"
                  />
                </div>
                <div className="form-group">
                  <label>Upload Video File</label>
                  <input
                    type="file"
                    name="videoFile"
                    accept="video/*"
                    onChange={handleInputChange}
                  />
                  {formData.videoFile && <small>Selected: {formData.videoFile}</small>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Description</h3>
              <div className="form-group">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your property..."
                  rows="4"
                />
              </div>
            </div>

            {/* Monetization Section */}
            <div className="form-section monetization">
              <h3>💰 Monetization Options</h3>
              
              <div className="monetization-options">
                <div className="option-card">
                  <div className="option-header">
                    <input
                      type="checkbox"
                      name="payRegistrationFee"
                      checked={formData.payRegistrationFee}
                      onChange={handleInputChange}
                      id="registrationFee"
                    />
                    <label htmlFor="registrationFee">
                      <span className="option-title">Seller Registration Fee</span>
                      <span className="option-price">₹500 one-time</span>
                    </label>
                  </div>
                  <p className="option-desc">
                    Pay a one-time registration fee to become a verified seller. 
                    Get a verified badge and priority support.
                  </p>
                </div>

                <div className="option-card premium">
                  <div className="option-header">
                    <input
                      type="checkbox"
                      name="isPremium"
                      checked={formData.isPremium}
                      onChange={handleInputChange}
                      id="premiumListing"
                    />
                    <label htmlFor="premiumListing">
                      <span className="option-title">⭐ Premium Listing</span>
                      <span className="option-price">₹1000 per listing</span>
                    </label>
                  </div>
                  <p className="option-desc">
                    Get your property featured at the top of search results with a premium badge.
                    Increase visibility by 5x!
                  </p>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                List Property
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Properties */}
      <div className="my-properties">
        <h2>My Properties</h2>
        {sellerProperties.length > 0 ? (
          <div className="properties-grid">
            {sellerProperties.map(property => (
              <div key={property.id} className="seller-property-card">
                <img src={property.image} alt={property.title} />
                <div className="seller-property-info">
                  <h3>{property.title}</h3>
                  <p className="price">{property.priceLabel}</p>
                  <p className="location">{property.location}</p>
                  <div className="seller-property-meta">
                    <span className={`status ${property.isApproved ? 'approved' : 'pending'}`}>
                      {property.isApproved ? '✓ Approved' : '⏳ Pending'}
                    </span>
                    {property.isPremium && <span className="premium-badge">⭐ Premium</span>}
                  </div>
                  <div className="seller-property-stats">
                    <span>👁 {property.views || 0} views</span>
                    <span>💬 {property.inquiries?.length || 0} inquiries</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-properties">
            <p>You haven't listed any properties yet.</p>
            <button onClick={() => setShowAddForm(true)}>List Your First Property</button>
          </div>
        )}
      </div>

      <div className="seller-inquiries">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>Recent Inquiries</h2>
          {sellerInquiries.length > 0 && (
            <Link 
              to="/seller/inquiries" 
              style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}
            >
              View All →
            </Link>
          )}
        </div>
        {sellerInquiries.length > 0 ? (
          <div className="inquiries-list">
            {sellerInquiries.slice(0, 3).map((inquiry, index) => (
              <div key={index} className="inquiry-card" style={{ padding: 20, borderRadius: 16, border: '1px solid #e0e0e0', background: '#fafafa', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <h3 style={{ margin: 0 }}>{inquiry.property.title}</h3>
                  <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>
                    Inquiry
                  </span>
                </div>
                <p style={{ margin: '8px 0 4px', color: '#555' }}>
                  <strong>From:</strong> {inquiry.buyerName || 'Interested Buyer'}
                </p>
                <p style={{ margin: '4px 0 12px', color: '#777', fontSize: 12 }}>
                  Received on: {new Date(inquiry.date).toLocaleDateString()}
                </p>
                <div style={{ background: '#fff', padding: 12, borderRadius: 8, borderLeft: '4px solid #1976d2', marginBottom: 12 }}>
                  <p style={{ margin: 0, color: '#333', lineHeight: 1.5, fontSize: 14 }}>
                    {inquiry.message}
                  </p>
                </div>
                <Link
                  to={`/property/${inquiry.propertyId}`}
                  style={{ display: 'inline-block', marginTop: 8, color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}
                >
                  View Property Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 40, background: '#f5f5f5', borderRadius: 16 }}>
            <h3 style={{ color: '#666' }}>No inquiries yet</h3>
            <p style={{ color: '#999' }}>
              You haven't received any inquiries yet. <Link to="/seller/add">Add a property</Link> to start receiving inquiries from buyers.
            </p>
          </div>
        )}
      </div>

      <div className="seller-appointments">
        <h2>Scheduled Appointments</h2>
        {sellerAppointments.length > 0 ? (
          <div className="appointments-list">
            {sellerAppointments.map((appointment, index) => (
              <div key={index} className="appointment-card">
                <h3>{appointment.property.title}</h3>
                <p><strong>Type:</strong> {appointment.scheduleType === 'video' ? 'Video Call' : 'Site Visit'}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
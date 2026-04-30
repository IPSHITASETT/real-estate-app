import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import './PropertyDetailsPage.css';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProperties, addInquiry, toggleWishlist, isInWishlist } = usePropertyContext();
  const { user } = useAuthContext();
  const { notify } = useNotificationContext();
  const location = useLocation();
  
  const property = allProperties.find(p => p.id === Number(id));
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleType, setScheduleType] = useState('video'); // 'video' or 'site'
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <Link to="/properties">Back to Properties</Link>
      </div>
    );
  }

  const handleSchedule = (type) => {
    if (!user) {
      notify.error('Please login to schedule an appointment');
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }
    setScheduleType(type);
    setShowScheduleModal(true);
  };

  const handleSubmitSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      notify.error('Please select date and time');
      return;
    }
    
    // Add inquiry/appointment
    addInquiry(property.id, {
      type: 'appointment',
      scheduleType,
      date: scheduleDate,
      time: scheduleTime,
      status: 'pending',
      userId: user?.id,
    });
    
    notify.success(`${scheduleType === 'video' ? 'Video Call' : 'Site Visit'} scheduled for ${scheduleDate} at ${scheduleTime}`);
    setShowScheduleModal(false);
    setScheduleDate('');
    setScheduleTime('');
  };

  const handleInquiry = () => {
    if (!user) {
      notify.error('Please login to send an inquiry');
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }
    if (!inquiryMessage.trim()) {
      notify.error('Please enter a message');
      return;
    }
    
    addInquiry(property.id, {
      type: 'inquiry',
      message: inquiryMessage,
      userId: user?.id,
      date: new Date().toISOString(),
    });
    
    notify.success('Inquiry sent successfully!');
    setInquiryMessage('');
  };

  return (
    <div className="property-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> / {property.title}
      </div>

      {/* Image Gallery */}
      <div className="property-gallery">
        <div className="main-image">
          <img src={property.image} alt={property.title} />
          {property.isPremium && <span className="premium-badge">Premium</span>}
          <button 
            className={`wishlist-btn ${isInWishlist(property.id) ? 'active' : ''}`}
            onClick={() => {
              if (!user) {
                notify.info('Please login to save favorites');
                navigate('/login', { state: { from: location }, replace: true });
                return;
              }
              const currentlySaved = isInWishlist(property.id);
              toggleWishlist(property.id);
              notify.success(currentlySaved ? 'Removed from favorites' : 'Saved to favorites');
            }}
          >
            {isInWishlist(property.id) ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Property Info Header */}
      <div className="property-header">
        <div className="property-title-section">
          <h1>{property.title}</h1>
          <p className="property-location">📍 {property.location}</p>
          <p className="property-type">🏠 {property.type}</p>
        </div>
        <div className="property-price-section">
          <span className="price">{property.priceLabel}</span>
          <span className="configuration">{property.configuration}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <a href={`tel:${property.phone}`} className="action-btn call-btn">
          📞 Call Seller
        </a>
        <button onClick={() => handleSchedule('video')} className="action-btn video-btn">
          🎥 Schedule Video Call
        </button>
        <button onClick={() => handleSchedule('site')} className="action-btn visit-btn">
          🏗 Schedule Site Visit
        </button>
      </div>

      {/* Tabs */}
      <div className="property-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setActiveTab('amenities')}
        >
          Amenities
        </button>
        <button 
          className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="info-grid">
              <div className="info-card">
                <h3>Property Details</h3>
                <ul>
                  <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                  <li><strong>Bathrooms:</strong> {property.bathrooms}</li>
                  <li><strong>Super Built-up Area:</strong> {property.sqft} sqft</li>
                  <li><strong>Configuration:</strong> {property.configuration}</li>
                  <li><strong>Possession:</strong> {property.possession}</li>
                  <li><strong>Possession Date:</strong> {property.possessionDate}</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Location</h3>
                <ul>
                  <li><strong>City:</strong> {property.city}</li>
                  <li><strong>State:</strong> {property.state}</li>
                  <li><strong>Locality:</strong> {property.locality}</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Builder Info</h3>
                <ul>
                  <li><strong>Builder:</strong> {property.builder}</li>
                  <li><strong>Property Type:</strong> {property.type}</li>
                  <li><strong>Contact:</strong> {property.phone}</li>
                </ul>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="inquiry-section">
              <h3>Send Inquiry</h3>
              <textarea
                placeholder="Enter your message..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
              />
              <button className="submit-inquiry-btn" onClick={handleInquiry}>
                Send Inquiry
              </button>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="amenities-section">
            <h3>Available Amenities</h3>
            <div className="amenities-grid">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  ✓ {amenity}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="videos-section">
            <div className="video-card">
              <h3>Building & Locality Video</h3>
              <div className="video-placeholder">
                <iframe 
                  src={property.buildingVideo} 
                  title="Building Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="video-card">
              <h3>Sample Flat Video</h3>
              <div className="video-placeholder">
                <iframe 
                  src={property.flatVideo} 
                  title="Flat Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Schedule {scheduleType === 'video' ? 'Video Call' : 'Site Visit'}</h2>
            <p>Property: {property.title}</p>
            
            <div className="form-group">
              <label>Select Date:</label>
              <input 
                type="date" 
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Select Time:</label>
              <input 
                type="time" 
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleSubmitSchedule}>
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
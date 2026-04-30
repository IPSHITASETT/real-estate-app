import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { allProperties, setPropertyApproval, inquiries, appointments } = usePropertyContext();
  const { users } = useAuthContext();
  const { notify } = useNotificationContext();
  
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Get pending properties
  const pendingProperties = allProperties.filter(p => !p.isApproved);
  const approvedProperties = allProperties.filter(p => p.isApproved);
  
  // Get all inquiries
  const allInquiries = inquiries;
  
  // Get all appointments
  const allAppointments = appointments;
  
  // Stats
  const stats = {
    totalProperties: allProperties.length,
    pendingApproval: pendingProperties.length,
    totalUsers: users.length,
    totalInquiries: allInquiries.length,
    totalAppointments: allAppointments.length,
  };

  const handleApprove = (propertyId) => {
    setPropertyApproval(propertyId, true);
    notify.success('Property approved successfully!');
  };

  const handleReject = (propertyId) => {
    if (window.confirm('Are you sure you want to reject this property?')) {
      setPropertyApproval(propertyId, false);
      notify.error('Property rejected!');
    }
  };

  const handleDelete = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      notify.info('Property deleted from the admin dashboard (UI only).');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage properties, users, and appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <h3>{stats.totalProperties}</h3>
            <p>Total Properties</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingApproval}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3>{stats.totalInquiries}</h3>
            <p>Inquiries</p>
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

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          Properties ({pendingProperties.length} pending)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          Inquiries ({allInquiries.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments ({allAppointments.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {activeTab === 'properties' && (
          <div className="properties-section">
            {pendingProperties.length > 0 && (
              <div className="section-group">
                <h2>Pending Approval</h2>
                <div className="property-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Seller</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingProperties.map(property => (
                        <tr key={property.id}>
                          <td>#{property.id}</td>
                          <td>{property.title}</td>
                          <td>{property.priceLabel}</td>
                          <td>{property.location}</td>
                          <td>{property.sellerName || 'N/A'}</td>
                          <td className="action-btns">
                            <button 
                              className="approve-btn"
                              onClick={() => handleApprove(property.id)}
                            >
                              ✓ Approve
                            </button>
                            <button 
                              className="reject-btn"
                              onClick={() => handleReject(property.id)}
                            >
                              ✗ Reject
                            </button>
                            <button 
                              className="view-btn"
                              onClick={() => setSelectedProperty(property)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="section-group">
              <h2>All Properties</h2>
              <div className="property-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Premium</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProperties.map(property => (
                      <tr key={property.id}>
                        <td>#{property.id}</td>
                        <td>{property.title}</td>
                        <td>{property.priceLabel}</td>
                        <td>{property.location}</td>
                        <td>
                          <span className={`status-badge ${property.isApproved ? 'approved' : 'pending'}`}>
                            {property.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td>{property.isPremium ? '⭐ Yes' : 'No'}</td>
                        <td className="action-btns">
                          <button 
                            className="view-btn"
                            onClick={() => setSelectedProperty(property)}
                          >
                            View
                          </button>
                          {!property.isApproved && (
                            <button 
                              className="approve-btn"
                              onClick={() => handleApprove(property.id)}
                            >
                              Approve
                            </button>
                          )}
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(property.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>All Users</h2>
            <div className="users-grid">
              {users.length > 0 ? (
                users.map(user => (
                  <div key={user.id} className="user-card">
                    <div className="user-avatar">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="user-info">
                      <h3>{user.name || 'Unknown'}</h3>
                      <p>{user.email || 'No email'}</p>
                      <span className={`role-badge ${user.role}`}>
                        {user.role || 'buyer'}
                      </span>
                    </div>
                    <div className="user-actions">
                      <button className="view-btn">View Profile</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No users registered yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="inquiries-section">
            <h2>Property Inquiries</h2>
            {allInquiries.length > 0 ? (
              <div className="inquiries-list">
                {allInquiries.map((inquiry, index) => {
                  const property = allProperties.find(p => p.id === inquiry.propertyId);
                  return (
                    <div key={index} className="inquiry-card">
                      <div className="inquiry-header">
                        <span className="inquiry-type">{inquiry.type || 'General'}</span>
                        <span className="inquiry-date">
                          {inquiry.date ? new Date(inquiry.date).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="inquiry-body">
                        <p><strong>Property:</strong> {property?.title || 'Unknown'}</p>
                        <p><strong>Message:</strong> {inquiry.message || 'No message'}</p>
                        <p><strong>User ID:</strong> {inquiry.userId || 'Guest'}</p>
                      </div>
                      <div className="inquiry-actions">
                        <button className="view-btn">Reply</button>
                        <button className="resolve-btn">Mark Resolved</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-data">No inquiries yet.</p>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <h2>Scheduled Appointments</h2>
            {allAppointments.length > 0 ? (
              <div className="appointments-list">
                {allAppointments.map((appointment, index) => {
                  const property = allProperties.find(p => p.id === appointment.propertyId);
                  return (
                    <div key={index} className="appointment-card">
                      <div className="appointment-header">
                        <span className={`appointment-type ${appointment.scheduleType}`}>
                          {appointment.scheduleType === 'video' ? '🎥 Video Call' : '🏗 Site Visit'}
                        </span>
                        <span className={`status-badge ${appointment.status}`}>
                          {appointment.status || 'pending'}
                        </span>
                      </div>
                      <div className="appointment-body">
                        <p><strong>Property:</strong> {property?.title || 'Unknown'}</p>
                        <p><strong>Date:</strong> {appointment.date || 'N/A'}</p>
                        <p><strong>Time:</strong> {appointment.time || 'N/A'}</p>
                        <p><strong>User ID:</strong> {appointment.userId || 'Guest'}</p>
                      </div>
                      <div className="appointment-actions">
                        <button className="approve-btn">Confirm</button>
                        <button className="reject-btn">Cancel</button>
                        <button className="view-btn">Reschedule</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-data">No appointments scheduled.</p>
            )}
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProperty(null)}>×</button>
            <h2>{selectedProperty.title}</h2>
            <div className="modal-property-details">
              <img src={selectedProperty.image} alt={selectedProperty.title} />
              <div className="details">
                <p><strong>Price:</strong> {selectedProperty.priceLabel}</p>
                <p><strong>Location:</strong> {selectedProperty.location}</p>
                <p><strong>Type:</strong> {selectedProperty.type}</p>
                <p><strong>Configuration:</strong> {selectedProperty.configuration}</p>
                <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {selectedProperty.bathrooms}</p>
                <p><strong>Sqft:</strong> {selectedProperty.sqft}</p>
                <p><strong>Description:</strong> {selectedProperty.description}</p>
                <p><strong>Seller:</strong> {selectedProperty.sellerName || 'N/A'}</p>
                <p><strong>Status:</strong> {selectedProperty.isApproved ? 'Approved' : 'Pending'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
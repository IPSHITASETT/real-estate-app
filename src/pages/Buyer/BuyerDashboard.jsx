import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { usePropertyContext } from '../../context/PropertyContext';

const BuyerDashboard = () => {
  const { user } = useAuthContext();
  const { wishlist = [], allProperties = [], appointments = [] } = usePropertyContext();

  const savedProperties = allProperties.filter((property) => wishlist.includes(property.id));
  const userAppointments = appointments.filter((appointment) => appointment.userId === user?.id);
  
  // Get all inquiries for this user from all properties
  const userInquiries = allProperties.flatMap(property =>
    (property.inquiries || [])
      .filter(inquiry => inquiry.userId === user?.id && inquiry.type === 'inquiry')
      .map(inquiry => ({ ...inquiry, property }))
  );

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: 32 }}>
        <h1>Buyer Dashboard</h1>
        <p style={{ color: '#555' }}>
          Welcome back, {user?.name}. Manage your saved properties and appointments from one place.
        </p>
      </div>

      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: '1 1 240px', padding: 20, borderRadius: 18, background: '#f5f8ff' }}>
            <h3>Saved Properties</h3>
            <p style={{ margin: 0, color: '#333' }}>{savedProperties.length} saved</p>
          </div>
          <div style={{ flex: '1 1 240px', padding: 20, borderRadius: 18, background: '#f5ffef' }}>
            <h3>Scheduled Appointments</h3>
            <p style={{ margin: 0, color: '#333' }}>{userAppointments.length} scheduled</p>
          </div>
          <Link
            to="/buyer/inquiries"
            style={{
              flex: '1 1 240px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ padding: 20, borderRadius: 18, background: '#fff3e0', cursor: 'pointer' }}>
              <h3>Inquiries</h3>
              <p style={{ margin: 0, color: '#333' }}>{userInquiries.length} sent</p>
            </div>
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Saved Favorites</h2>
        {savedProperties.length > 0 ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {savedProperties.map((property) => (
              <div key={property.id} style={{ padding: 20, borderRadius: 16, border: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0 }}>{property.title}</h3>
                  <span style={{ color: '#1976d2', fontWeight: 600 }}>{property.priceLabel}</span>
                </div>
                <p style={{ margin: '10px 0 0', color: '#555' }}>{property.location}</p>
                <Link to={`/property/${property.id}`} style={{ marginTop: 12, display: 'inline-block', color: '#1976d2' }}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#555' }}>
            You don’t have any saved properties yet. <Link to="/properties">Browse listings</Link> to save your favorites.
          </p>
        )}
      </section>

      <section>
        <h2>Scheduled Appointments</h2>
        {userAppointments.length > 0 ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {userAppointments.map((appointment) => {
              const property = allProperties.find((item) => item.id === appointment.propertyId);
              return (
                <div key={appointment.id} style={{ padding: 20, borderRadius: 16, border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <h3 style={{ margin: 0 }}>{property?.title || 'Property'}</h3>
                    <span style={{ color: '#4caf50', fontWeight: 600 }}>{appointment.scheduleType === 'video' ? 'Video Call' : 'Site Visit'}</span>
                  </div>
                  <p style={{ margin: '10px 0 4px', color: '#555' }}>{appointment.date} at {appointment.time}</p>
                  <p style={{ margin: 0, color: '#777' }}>Property ID: {appointment.propertyId}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: '#555' }}>No appointments scheduled yet. Select a property to book a video call or site visit.</p>
        )}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Recent Inquiries</h2>
        {userInquiries.length > 0 ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {userInquiries.slice(0, 3).map((inquiry) => (
              <div key={inquiry.id} style={{ padding: 20, borderRadius: 16, border: '1px solid #e0e0e0', background: '#fafafa' }}>
                <h3 style={{ margin: 0, marginBottom: 8 }}>{inquiry.property?.title || 'Property'}</h3>
                <p style={{ margin: '4px 0', color: '#777', fontSize: 12 }}>
                  Sent on: {new Date(inquiry.date).toLocaleDateString()}
                </p>
                <div style={{ background: '#fff', padding: 12, borderRadius: 8, borderLeft: '4px solid #ff9800', marginTop: 8, marginBottom: 8 }}>
                  <p style={{ margin: 0, color: '#333', fontSize: 14 }}>{inquiry.message}</p>
                </div>
                <Link to="/buyer/inquiries" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                  View All Inquiries →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#555' }}>
            No inquiries sent yet. <Link to="/properties">Browse properties</Link> to send inquiries.
          </p>
        )}
      </section>
    </div>
  );
};

export default BuyerDashboard;

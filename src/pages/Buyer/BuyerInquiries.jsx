import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { usePropertyContext } from '../../context/PropertyContext';

const BuyerInquiries = () => {
  const { user } = useAuthContext();
  const { inquiries = [], allProperties = [] } = usePropertyContext();

  // Filter inquiries for this buyer, excluding appointments
  const buyerInquiries = inquiries.filter(
    (inquiry) => inquiry.userId === user?.id && inquiry.type === 'inquiry'
  );

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: 32 }}>
        <h1>My Inquiries</h1>
        <p style={{ color: '#555' }}>
          View all your inquiries and messages sent to property sellers.
        </p>
      </div>

      <section>
        {buyerInquiries.length > 0 ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {buyerInquiries.map((inquiry) => {
              const property = allProperties.find((item) => item.id === inquiry.propertyId);
              return (
                <div
                  key={inquiry.id}
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    border: '1px solid #e0e0e0',
                    background: '#fafafa',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: 12,
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{property?.title || 'Property'}</h3>
                    <span
                      style={{
                        background: '#e3f2fd',
                        color: '#1976d2',
                        padding: '4px 12px',
                        borderRadius: 16,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Inquiry
                    </span>
                  </div>

                  <p style={{ margin: '8px 0 4px', color: '#555' }}>
                    <strong>Property Location:</strong> {property?.location || 'N/A'}
                  </p>
                  <p style={{ margin: '4px 0 12px', color: '#777', fontSize: 12 }}>
                    Sent on: {new Date(inquiry.date).toLocaleDateString()}
                  </p>

                  <div
                    style={{
                      background: '#fff',
                      padding: 12,
                      borderRadius: 8,
                      borderLeft: '4px solid #1976d2',
                      marginBottom: 12,
                    }}
                  >
                    <p style={{ margin: 0, color: '#333', lineHeight: 1.5 }}>
                      {inquiry.message}
                    </p>
                  </div>

                  <Link
                    to={`/property/${inquiry.propertyId}`}
                    style={{
                      display: 'inline-block',
                      marginTop: 8,
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    View Property Details →
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: 40,
              background: '#f5f5f5',
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: '#666' }}>No inquiries yet</h3>
            <p style={{ color: '#999' }}>
              You haven't sent any inquiries yet. <Link to="/properties">Browse properties</Link> to send an inquiry.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BuyerInquiries;

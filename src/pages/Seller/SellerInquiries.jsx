import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { usePropertyContext } from '../../context/PropertyContext';

const SellerInquiries = () => {
  const { user } = useAuthContext();
  const { allProperties = [] } = usePropertyContext();

  // Get seller's properties
  const sellerProperties = allProperties.filter(p => p.sellerId === user?.id);

  // Get all inquiries received on seller's properties
  const sellerInquiries = sellerProperties.flatMap(property =>
    (property.inquiries || [])
      .filter(i => i.type === 'inquiry')
      .map(inquiry => ({ ...inquiry, property }))
  );

  // TEMP: Show all inquiries for debugging
  const allInquiries = allProperties.flatMap(property =>
    (property.inquiries || [])
      .filter(i => i.type === 'inquiry')
      .map(inquiry => ({ ...inquiry, property }))
  );

  console.log('Seller ID:', user?.id);
  console.log('Seller Properties:', sellerProperties);
  console.log('Seller Inquiries:', sellerInquiries);
  console.log('All Inquiries:', allInquiries);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: 32 }}>
        <h1>All Inquiries Received</h1>
        <p style={{ color: '#555' }}>
          View all inquiries from buyers interested in your properties.
        </p>
      </div>

      <section>
        {allInquiries.length > 0 ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {allInquiries.map((inquiry) => {
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
                    <h3 style={{ margin: 0 }}>{inquiry.property?.title || 'Property'}</h3>
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
                    <strong>From:</strong> {inquiry.buyerName || 'Interested Buyer'}
                  </p>
                  <p style={{ margin: '4px 0 12px', color: '#777', fontSize: 12 }}>
                    Received on: {new Date(inquiry.date).toLocaleDateString()}
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
            <h3 style={{ color: '#666' }}>No inquiries yet (DEBUG: {allInquiries.length} total)</h3>
            <p style={{ color: '#999' }}>
              You haven't received any inquiries yet. <Link to="/seller/add">Add a property</Link> to start receiving inquiries from buyers.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerInquiries;

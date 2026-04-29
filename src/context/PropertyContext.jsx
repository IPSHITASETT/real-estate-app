import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import propertiesRaw from '../data/properties.json';
import { filterProperties } from '../utils/helpers';
import { generateId } from '../utils/helpers';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(propertiesRaw);
  const [filters, setFilters] = useState({
    city: '',
    configuration: [],
    possession: [],
    minPrice: '',
    maxPrice: '',
  });
  const [viewMode, setViewMode] = useState('list');
  
  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('re_wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('re_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((propertyId) => {
    setWishlist((prev) => {
      if (prev.includes(propertyId)) return prev;
      return [...prev, propertyId];
    });
  }, []);

  const removeFromWishlist = useCallback((propertyId) => {
    setWishlist((prev) => prev.filter((id) => id !== propertyId));
  }, []);

  const isInWishlist = useCallback((propertyId) => {
    return wishlist.includes(propertyId);
  }, [wishlist]);

  const toggleWishlist = useCallback((propertyId) => {
    if (wishlist.includes(propertyId)) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(propertyId);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const filteredProperties = filterProperties(properties, filters);

  const approvedProperties = filteredProperties.filter((p) => p.isApproved);

  const addProperty = useCallback((propData) => {
    const newProp = {
      ...propData,
      id: properties.length + Date.now(),
      isApproved: false,
      isPremium: propData.isPremium || false,
      inquiries: [],
      appointments: [],
    };
    setProperties((prev) => [newProp, ...prev]);
    return newProp;
  }, [properties]);

  const approveProperty = useCallback((id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isApproved: true } : p))
    );
  }, []);

  const rejectProperty = useCallback((id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isApproved: false } : p))
    );
  }, []);

  const addInquiry = useCallback((propertyId, inquiry) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? { ...p, inquiries: [...(p.inquiries || []), { id: generateId(), ...inquiry }] }
          : p
      )
    );
  }, []);

  // Get all inquiries from all properties
  const allInquiries = properties.flatMap(p => 
    (p.inquiries || []).map(i => ({ ...i, propertyId: p.id }))
  );

  // Get all appointments from all properties
  const allAppointments = properties.flatMap(p => 
    (p.inquiries || []).filter(i => i.type === 'appointment').map(a => ({ ...a, propertyId: p.id }))
  );

  const setPropertyApproval = useCallback((id, approved) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isApproved: approved } : p))
    );
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties: approvedProperties,
        allProperties: properties,
        filters,
        setFilters,
        viewMode,
        setViewMode,
        addProperty,
        approveProperty,
        rejectProperty,
        setPropertyApproval,
        addInquiry,
        inquiries: allInquiries,
        appointments: allAppointments,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('usePropertyContext must be used inside PropertyProvider');
  return ctx;
};

export default PropertyContext;
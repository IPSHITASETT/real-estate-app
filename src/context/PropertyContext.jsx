import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import propertiesRaw from '../data/properties.json';
import { filterProperties } from '../utils/helpers';
import { generateId } from '../utils/helpers';
import { useAuthContext } from './AuthContext';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [properties, setProperties] = useState(() => {
    const stored = localStorage.getItem('re_properties');
    return stored ? JSON.parse(stored) : propertiesRaw || [];
  });
  const [filters, setFilters] = useState({
    city: '',
    configuration: [],
    possession: [],
    minPrice: '',
    maxPrice: '',
    isPremium: false,
    type: '',
  });
  const [viewMode, setViewMode] = useState('list');
  
  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist based on user
  useEffect(() => {
    const key = user ? `re_wishlist_${user.id}` : null;
    if (key) {
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : [];
      setWishlist(parsed.map(id => Number(id)));
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Persist properties to localStorage
  useEffect(() => {
    localStorage.setItem('re_properties', JSON.stringify(properties));
  }, [properties]);

  // Persist wishlist to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`re_wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = useCallback((propertyId) => {
    const id = Number(propertyId);
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromWishlist = useCallback((propertyId) => {
    const id = Number(propertyId);
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const isInWishlist = useCallback((propertyId) => {
    const id = Number(propertyId);
    return wishlist.includes(id);
  }, [wishlist]);

  const toggleWishlist = useCallback((propertyId) => {
    const id = Number(propertyId);
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const filteredProperties = filterProperties(properties, filters);

  const approvedProperties = (filteredProperties || []).filter((p) => p.isApproved);

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
  const allInquiries = (properties || []).flatMap(p => 
    (p.inquiries || []).map(i => ({ ...i, propertyId: p.id }))
  );

  // Get all appointments from all properties
  const allAppointments = (properties || []).flatMap(p => 
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
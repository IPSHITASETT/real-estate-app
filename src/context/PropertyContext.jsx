import React, { createContext, useContext, useState, useCallback } from 'react';
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
        addInquiry,
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
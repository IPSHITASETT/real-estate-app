import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePropertyContext } from '../../context/PropertyContext';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allProperties, filters, setFilters } = usePropertyContext();
  
  const [localFilters, setLocalFilters] = useState({
    city: searchParams.get('city') || '',
    configuration: searchParams.get('configuration')?.split(',').filter(Boolean) || [],
    possession: searchParams.get('possession')?.split(',').filter(Boolean) || [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    isPremium: searchParams.get('isPremium') === 'true',
    type: searchParams.get('type') || '',
  });

  // Apply filters from URL on mount
  useEffect(() => {
    const city = searchParams.get('city') || '';
    const configuration = searchParams.get('configuration')?.split(',').filter(Boolean) || [];
    const possession = searchParams.get('possession')?.split(',').filter(Boolean) || [];
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const isPremium = searchParams.get('isPremium') === 'true';
    const type = searchParams.get('type') || '';

    setFilters({
      city,
      configuration,
      possession,
      minPrice,
      maxPrice,
      isPremium,
      type,
    });
  }, []);

  const handleFilterChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setLocalFilters(prev => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (localFilters.city) params.set('city', localFilters.city);
    if (localFilters.configuration.length) params.set('configuration', localFilters.configuration.join(','));
    if (localFilters.possession.length) params.set('possession', localFilters.possession.join(','));
    if (localFilters.minPrice) params.set('minPrice', localFilters.minPrice);
    if (localFilters.maxPrice) params.set('maxPrice', localFilters.maxPrice);
    if (localFilters.isPremium) params.set('isPremium', 'true');
    if (localFilters.type) params.set('type', localFilters.type);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    const empty = { city: '', configuration: [], possession: [], minPrice: '', maxPrice: '', isPremium: false, type: '' };
    setLocalFilters(empty);
    setFilters(empty);
    setSearchParams({});
  };

  // Filter properties locally for display
  const filteredProps = allProperties.filter(p => {
    if (!p.isApproved) return false;
    
    const matchCity = !localFilters.city || 
      p.city.toLowerCase().includes(localFilters.city.toLowerCase()) ||
      p.locality.toLowerCase().includes(localFilters.city.toLowerCase());
    
    const matchConfig = localFilters.configuration.length === 0 ||
      localFilters.configuration.includes(p.configuration);
    
    const matchPossession = localFilters.possession.length === 0 ||
      localFilters.possession.includes(p.possession);
    
    const matchMinPrice = !localFilters.minPrice || p.price >= Number(localFilters.minPrice);
    const matchMaxPrice = !localFilters.maxPrice || p.price <= Number(localFilters.maxPrice);
    
    const matchPremium = !localFilters.isPremium || p.isPremium;
    
    const matchType = !localFilters.type || p.type === localFilters.type;
    
    return matchCity && matchConfig && matchPossession && matchMinPrice && matchMaxPrice && matchPremium && matchType;
  });

  return (
    <div className="properties-page">
      {/* Left Sidebar - Filters */}
      <aside className="filters-sidebar">
        <div className="filters-header">
          <h2>Filters</h2>
          <button className="clear-btn" onClick={clearFilters}>Clear All</button>
        </div>

        <div className="filter-section">
          <label>Location (City)</label>
          <input
            type="text"
            placeholder="Search by city..."
            value={localFilters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          />
        </div>

        <div className="filter-section">
          <label>Configuration</label>
          <div className="checkbox-list">
            {['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'].map(config => (
              <label key={config} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFilters.configuration.includes(config)}
                  onChange={() => handleCheckboxChange('configuration', config)}
                />
                {config}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label>Possession</label>
          <div className="checkbox-list">
            {['Ready', '6 months', '1 year', '2 years'].map(pos => (
              <label key={pos} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFilters.possession.includes(pos)}
                  onChange={() => handleCheckboxChange('possession', pos)}
                />
                {pos}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label>Price Range</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min Price"
              value={localFilters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max Price"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <label className="checkbox-item premium-filter">
            <input
              type="checkbox"
              checked={localFilters.isPremium}
              onChange={(e) => handleFilterChange('isPremium', e.target.checked)}
            />
            Premium Properties Only
          </label>
        </div>

        <div className="filter-section">
          <label>Property Type</label>
          <div className="checkbox-list">
            {['Residential Apartment', 'Villa', 'Independent House', 'Office Space', 'Commercial Space', 'Residential Land', 'Penthouse'].map(type => (
              <label key={type} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFilters.type === type}
                  onChange={() => {
                    if (localFilters.type === type) {
                      handleFilterChange('type', '');
                    } else {
                      handleFilterChange('type', type);
                    }
                  }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <button className="apply-btn" onClick={applyFilters}>
          Apply Filters
        </button>
      </aside>

      {/* Right Side - Property Cards */}
      <main className="properties-content">
        <div className="properties-header">
          <h1>All Properties</h1>
          <span className="results-count">{filteredProps.length} properties found</span>
        </div>

        {filteredProps.length === 0 ? (
          <div className="no-results">
            <p>No properties match your criteria.</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          <div className="properties-grid">
            {filteredProps.map(property => (
              <div key={property.id} className="property-card-horizontal">
                <div className="card-image">
                  <img src={property.image} alt={property.title} />
                  {property.isPremium && <span className="premium-badge">Premium</span>}
                </div>
                <div className="card-details">
                  <h3>{property.title}</h3>
                  <p className="card-location">{property.location}</p>
                  <p className="card-price">{property.priceLabel}</p>
                  <div className="card-features">
                    <span>🛏 {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>📐 {property.sqft} sqft</span>
                  </div>
                  <p className="card-config">{property.configuration} | {property.possession}</p>
                  <p className="card-builder">🏗️ {property.builder}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertiesPage;
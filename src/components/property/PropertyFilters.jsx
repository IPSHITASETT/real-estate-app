import React from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import './PropertyFilters.css';

const PropertyFilters = () => {
  const { filters, setFilters } = usePropertyContext();

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFilters((prev) => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      configuration: [],
      possession: [],
      minPrice: '',
      maxPrice: '',
    });
  };

  return (
    <div className="property-filters">
      <div className="filter-group">
        <label>Location (City)</label>
        <input
          type="text"
          placeholder="Search by city..."
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Configuration</label>
        <div className="checkbox-group">
          {['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'].map((config) => (
            <label key={config} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.configuration.includes(config)}
                onChange={() => handleCheckboxChange('configuration', config)}
              />
              {config}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Possession</label>
        <div className="checkbox-group">
          {['Ready', '6 months', '1 year', '2 years'].map((pos) => (
            <label key={pos} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.possession.includes(pos)}
                onChange={() => handleCheckboxChange('possession', pos)}
              />
              {pos}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <button className="clear-filters-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default PropertyFilters;
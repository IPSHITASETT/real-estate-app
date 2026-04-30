import React from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { usePropertyContext } from '../../context/PropertyContext';
import heroImg from '../../assets/hero.jpg';
import './HeroSection.css';

const HeroSection = () => {
  const { setFilters } = usePropertyContext();

  const [searchFilters, setSearchFilters] = React.useState({
    location: '',
    configuration: '',
    minBudget: '',
    maxBudget: '',
    possession: ''
  });

  const stats = [
    { count: '10,000+', label: 'Properties' },
    { count: '5,000+', label: 'Happy Buyers' },
    { count: '500+', label: 'Verified Sellers' },
    { count: '50+', label: 'Cities' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Map hero filters to context filters
    const configArray = searchFilters.configuration 
      ? [searchFilters.configuration.toUpperCase()] 
      : [];
    
    const possessionArray = searchFilters.possession 
      ? [searchFilters.possession === 'ready' ? 'Ready' : searchFilters.possession === '6months' ? '6 months' : searchFilters.possession === '1year' ? '1 year' : '']
      : [];

    const newFilters = {
      city: searchFilters.location,
      configuration: configArray,
      possession: possessionArray,
      minPrice: searchFilters.minBudget,
      maxPrice: searchFilters.maxBudget,
      isPremium: false,
      type: '',
    };

    setFilters(newFilters);
  };

  return (
    <section className="hero-section">
      {/* Background with Overlay */}
      <div className="hero-background" style={{
    backgroundImage: `url(${heroImg})`
  }}>
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-main">
          {/* Left Side - Text Content */}
          <div className="hero-left">
            <h1 className="hero-title">
              Find Your <span className="highlight">Dream Home</span> Today
            </h1>
            <p className="hero-subtitle">
              Discover thousands of properties across India. Whether you're buying, 
              selling, or renting — we've got you covered with verified listings 
              and trusted sellers.
            </p>
          </div>

          {/* Right Side - Stats */}
          <div className="hero-right">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-count">{stat.count}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <form className="hero-search-container" onSubmit={handleSearch}>
          <div className="search-row">
            {/* Location Search */}
            <div className="search-field location-field">
              <label>Location</label>
              <Input
                type="text"
                name="location"
                placeholder="City, Locality or State"
                value={searchFilters.location}
                onChange={handleInputChange}
                icon="location"
              />
            </div>

            {/* Configuration Filter */}
            <div className="search-field">
              <label>Configuration</label>
              <select
                name="configuration"
                value={searchFilters.configuration}
                onChange={handleInputChange}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="4bhk">4+ BHK</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="search-field budget-field">
              <label>Budget Range</label>
              <div className="budget-inputs">
                <Input
                  type="number"
                  name="minBudget"
                  placeholder="Min"
                  value={searchFilters.minBudget}
                  onChange={handleInputChange}
                />
                <span className="budget-separator">to</span>
                <Input
                  type="number"
                  name="maxBudget"
                  placeholder="Max"
                  value={searchFilters.maxBudget}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Possession Period */}
            <div className="search-field">
              <label>Possession</label>
              <select
                name="possession"
                value={searchFilters.possession}
                onChange={handleInputChange}
                className="filter-select"
              >
                <option value="">Any Time</option>
                <option value="ready">Ready to Move</option>
                <option value="6months">Within 6 Months</option>
                <option value="1year">Within 1 Year</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="search-field search-btn-field">
              <Button type="submit" variant="primary" size="large">
                Search Properties
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;

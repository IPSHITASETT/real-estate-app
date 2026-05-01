import propertiesData from '../data/properties.json';

export const filterProperties = (properties, filters) => {
  if (!properties || !Array.isArray(properties)) return [];
  return properties.filter((p) => {
    const matchCity =
      !filters.city ||
      p.city.toLowerCase().includes(filters.city.toLowerCase()) ||
      p.locality.toLowerCase().includes(filters.city.toLowerCase()) ||
      p.state.toLowerCase().includes(filters.city.toLowerCase());

    const matchConfig =
      !filters.configuration || filters.configuration.length === 0 ||
      filters.configuration.includes(p.configuration);

    const matchPossession =
      !filters.possession || filters.possession.length === 0 ||
      filters.possession.includes(p.possession);

    const matchMinPrice = !filters.minPrice || p.price >= Number(filters.minPrice);
    const matchMaxPrice = !filters.maxPrice || p.price <= Number(filters.maxPrice);

    const matchPremium = !filters.isPremium || p.isPremium;
    const matchType = !filters.type || filters.type === '' || p.type === filters.type;

    return (
      matchCity &&
      matchConfig &&
      matchPossession &&
      matchMinPrice &&
      matchMaxPrice &&
      matchPremium &&
      matchType
    );
  });
};

export const getPropertyById = (id) => {
  return propertiesData.find((p) => p.id === Number(id));
};

export const generateId = () =>
  `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
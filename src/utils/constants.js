export const CONFIGURATIONS = ['1BHK', '2BHK', '3BHK'];

export const POSSESSION_OPTIONS = ['Ready', '6 months', '1 year'];

export const CITIES = [
  'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai',
  'Ahmedabad', 'Gurgaon', 'Noida', 'Ghaziabad', 'Lucknow',
  'Surat', 'Jodhpur'
];

export const PRICE_RANGES = [
  { label: 'Under ₹50L', min: 0, max: 5000000 },
  { label: '₹50L – ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr – ₹2Cr', min: 10000000, max: 20000000 },
  { label: '₹2Cr – ₹5Cr', min: 20000000, max: 50000000 },
  { label: 'Above ₹5Cr', min: 50000000, max: Infinity },
];

export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin',
};

export const VIEW_MODES = {
  LIST: 'list',
  MAP: 'map',
};

export const MOCK_USERS = [
  {
    id: 'user_001',
    name: 'Amit Sharma',
    email: 'amit@example.com',
    role: 'buyer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    savedProperties: [],
    appointments: [],
  },
  {
    id: 'seller_001',
    name: 'Priya Builders',
    email: 'priya@builder.com',
    role: 'seller',
    avatar: 'https://i.pravatar.cc/150?img=5',
    savedProperties: [],
    appointments: [],
    isPremiumSeller: true,
  },
  {
    id: 'admin_001',
    name: 'Admin User',
    email: 'admin@realestate.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=12',
    savedProperties: [],
    appointments: [],
  },
];
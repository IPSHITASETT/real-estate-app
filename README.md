# Real Estate Management System

A comprehensive full-stack real estate application built with React that allows users to browse, search, and manage properties. The platform supports multiple user roles including buyers, sellers, and administrators, providing a complete ecosystem for real estate transactions.

## 🚀 Features

### Core Functionality
- **Property Listings**: Browse and search through verified properties across India
- **Advanced Filtering**: Filter by location, configuration (1BHK-4+BHK), budget, possession status
- **Property Details**: Detailed property pages with images, videos, amenities, and builder information
- **Wishlist**: Save favorite properties for later viewing
- **Map View**: Visualize properties on an interactive map
- **Inquiry System**: Contact sellers directly through the platform

### User Management
- **Role-based Authentication**: Support for Buyers, Sellers, and Administrators
- **Secure Login System**: Protected routes based on user roles
- **User Dashboards**: Personalized dashboards for different user types

### Seller Features
- **Property Management**: Add, edit, and manage property listings
- **Inquiry Management**: Respond to buyer inquiries
- **Dashboard Analytics**: Track property performance and engagement

### Buyer Features
- **Personalized Search**: Save search preferences and filters
- **Inquiry Tracking**: Monitor responses from sellers
- **Appointment Scheduling**: Schedule site visits and video calls

### Admin Features
- **Property Approval**: Review and approve/reject property listings
- **User Management**: Monitor and manage platform users
- **Inquiry Oversight**: View and manage all platform inquiries
- **Appointment Management**: Oversee scheduled appointments
- **Analytics Dashboard**: Platform-wide statistics and metrics

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **Material-UI (MUI)**: Comprehensive UI component library
- **React Router DOM**: Client-side routing and navigation
- **React Toastify**: User notifications and alerts
- **React DatePicker**: Date selection for appointments
- **CSS3**: Custom styling with responsive design

### State Management
- **React Context API**: Global state management for authentication, properties, and notifications
- **Local Storage**: Persistent data storage for properties, wishlist, and user sessions

### Development Tools
- **Create React App**: Build setup and development server
- **ESLint**: Code linting and quality assurance
- **Jest & React Testing Library**: Unit and integration testing

## 📁 Project Structure

```
src/
├── app/
│   └── routes/
│       └── AppRoutes.js          # Application routing configuration
├── components/
│   ├── common/                   # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── NotificationToast.jsx
│   │   ├── RequireAuth.jsx       # Route protection component
│   │   └── ScrollToTop.jsx
│   ├── layout/                   # Layout components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── property/                 # Property-specific components
│       ├── HeroSection.jsx
│       ├── PropertyList.jsx
│       ├── PropertyFilters.jsx
│       ├── PropertyDetailsPage.jsx
│       └── MapView.jsx
├── context/                      # React Context providers
│   ├── AuthContext.jsx           # Authentication state
│   ├── PropertyContext.jsx       # Property and filter state
│   └── NotificationContext.jsx   # Notification management
├── data/
│   └── properties.json           # Sample property data
├── hooks/                        # Custom React hooks
│   ├── useAuth.js
│   └── useProperty.js
├── pages/                        # Page components
│   ├── Admin/
│   │   └── AdminPanel.jsx
│   ├── Auth/
│   │   └── LoginPage.jsx
│   ├── Buyer/
│   │   ├── BuyerDashboard.jsx
│   │   └── BuyerInquiries.jsx
│   ├── Home/
│   │   └── HomePage.jsx
│   ├── Properties/
│   │   └── PropertiesPage.jsx
│   ├── PropertyDetails/
│   │   └── PropertyDetailsPage.jsx
│   └── Seller/
│       ├── AddProperty.jsx
│       ├── SellerDashboard.jsx
│       └── SellerInquiries.jsx
├── utils/                        # Utility functions
│   ├── constants.js
│   ├── formatters.js
│   └── helpers.js
└── index.js                      # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## 🔐 User Roles & Access

### Guest Users
- Browse and search properties
- View property details
- Access public pages only

### Buyers
- All guest features
- Create wishlist
- Submit property inquiries
- Schedule appointments
- Access buyer dashboard

### Sellers
- All guest features
- Add/manage properties
- Respond to inquiries
- Access seller dashboard

### Administrators
- Full platform access
- Approve/reject properties
- Manage users and inquiries
- View analytics and reports

## 🎨 Key Components

### HeroSection
- Eye-catching landing section with search functionality
- Statistics display (properties, buyers, sellers, cities)
- Advanced filter options

### PropertyList & PropertyFilters
- Grid/list view of properties
- Real-time filtering by multiple criteria
- Search functionality with URL persistence

### PropertyDetailsPage
- Comprehensive property information
- Image/video galleries
- Inquiry and appointment scheduling
- Wishlist integration

### Dashboards
- **Buyer Dashboard**: Inquiry tracking and preferences
- **Seller Dashboard**: Property management and analytics
- **Admin Panel**: Platform management and oversight

## 🔄 Data Flow

1. **Authentication**: Users login with role-based access
2. **Property Loading**: Properties loaded from local storage/JSON
3. **Filtering**: Real-time filtering applied to property list
4. **State Management**: Context API manages global application state
5. **Persistence**: User data and preferences stored in localStorage

## 🧪 Testing

The application includes comprehensive testing setup:

```bash
npm test
```

Tests cover:
- Component rendering
- User interactions
- State management
- Route protection
- Form validations

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🔒 Security Features

- Route protection with RequireAuth component
- Role-based access control
- Input validation and sanitization
- Secure local storage management

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory, ready for deployment to any static hosting service.

### Environment Variables
Create a `.env` file for environment-specific configurations:
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_MAP_API_KEY=your_map_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ipshita** - *Full Stack Developer*

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Unsplash for property images
- React community for the amazing ecosystem
- Create React App for the solid foundation

---

**Note**: This is a demonstration project showcasing modern React development practices, state management, and UI/UX design principles. For production use, consider implementing a backend API and proper database integration.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

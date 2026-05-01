import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import HomePage from '../../pages/Home/HomePage';
import PropertiesPage from '../../pages/Properties/PropertiesPage';
import PropertyDetailsPage from '../../pages/PropertyDetails/PropertyDetailsPage';
import AdminPanel from '../../pages/Admin/AdminPanel';
import SellerDashboard from '../../pages/Seller/SellerDashboard';
import AddProperty from '../../pages/Seller/AddProperty';
import SellerInquiries from '../../pages/Seller/SellerInquiries';
import BuyerDashboard from '../../pages/Buyer/BuyerDashboard';
import BuyerInquiries from '../../pages/Buyer/BuyerInquiries';
import LoginPage from '../../pages/Auth/LoginPage';
import RequireAuth from '../../components/common/RequireAuth';
import ScrollToTop from '../../components/common/ScrollToTop';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Wrap Layout here */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        <Route
          path="/properties"
          element={
            <Layout>
              <PropertiesPage />
            </Layout>
          }
        />

        <Route
          path="/property/:id"
          element={
            <Layout>
              <PropertyDetailsPage />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />

        <Route
          path="/buyer"
          element={
            <Layout>
              <RequireAuth allowedRoles={['buyer']}>
                <BuyerDashboard />
              </RequireAuth>
            </Layout>
          }
        />

        <Route
          path="/buyer/inquiries"
          element={
            <Layout>
              <RequireAuth allowedRoles={['buyer']}>
                <BuyerInquiries />
              </RequireAuth>
            </Layout>
          }
        />

        <Route
          path="/seller"
          element={
            <Layout>
              <RequireAuth allowedRoles={['seller']}>
                <SellerDashboard />
              </RequireAuth>
            </Layout>
          }
        />

        <Route
          path="/seller/add"
          element={
            <Layout>
              <RequireAuth allowedRoles={['seller']}>
                <AddProperty />
              </RequireAuth>
            </Layout>
          }
        />

        <Route
          path="/seller/inquiries"
          element={
            <Layout>
              <RequireAuth allowedRoles={['seller']}>
                <SellerInquiries />
              </RequireAuth>
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <Layout>
              <RequireAuth allowedRoles={['admin']}>
                <AdminPanel />
              </RequireAuth>
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
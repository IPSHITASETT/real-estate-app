import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/Layout";

// Pages (currently simple placeholder)
const HomePage = () => <h1>Home Page</h1>;
const SellerDashboard = () => <h1>Seller Dashboard</h1>;
const AdminPanel = () => <h1>Admin Panel</h1>;

const AppRoutes = () => {
  return (
    <BrowserRouter>
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
          path="/seller"
          element={
            <Layout>
              <SellerDashboard />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <Layout>
              <AdminPanel />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const buttonStyles = {
  width: '100%',
  padding: '12px 18px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  marginBottom: '14px',
};

const LoginPage = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (role) => {
    login(role);
    if (from && from !== '/login') {
      navigate(from, { replace: true });
      return;
    }

    if (role === 'seller') {
      navigate('/seller', { replace: true });
    } else if (role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/buyer', { replace: true });
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 520, background: '#ffffff', borderRadius: 20, boxShadow: '0 16px 40px rgba(0,0,0,0.08)', padding: '32px' }}>
        <h1 style={{ marginBottom: 8 }}>Mock Google Login</h1>
        <p style={{ marginBottom: 24, color: '#555' }}>
          Simulate Google OAuth sign-in using a preset user role. This mock login enables protected buyer, seller, and admin workflows.
        </p>

        <button
          type="button"
          onClick={() => handleLogin('buyer')}
          style={{ ...buttonStyles, background: '#4285F4', color: '#ffffff' }}
        >
          Continue as Buyer
        </button>

        <button
          type="button"
          onClick={() => handleLogin('seller')}
          style={{ ...buttonStyles, background: '#34A853', color: '#ffffff' }}
        >
          Continue as Seller
        </button>

        <button
          type="button"
          onClick={() => handleLogin('admin')}
          style={{ ...buttonStyles, background: '#F4B400', color: '#ffffff' }}
        >
          Continue as Admin
        </button>

        <div style={{ marginTop: 24, color: '#777', lineHeight: 1.6 }}>
          Select the role you want to simulate. Buyer access enables saved properties and scheduling; seller access enables property upload and management; admin access enables approvals and user management.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

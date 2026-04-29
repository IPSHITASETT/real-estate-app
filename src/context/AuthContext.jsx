import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_USERS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('re_user');
    return stored ? JSON.parse(stored) : null;
  });

  // All registered users (in a real app, this would come from a database)
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('re_users');
    return stored ? JSON.parse(stored) : MOCK_USERS;
  });

  const login = useCallback((role = 'buyer') => {
    const mockUser = MOCK_USERS.find((u) => u.role === role) || MOCK_USERS[0];
    setUser(mockUser);
    localStorage.setItem('re_user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('re_user');
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('re_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const registerUser = useCallback((userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem('re_users', JSON.stringify(updated));
      return updated;
    });
    return newUser;
  }, []);

  const isBuyer = user?.role === 'buyer';
  const isSeller = user?.role === 'seller';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      registerUser,
      users,
      isBuyer, 
      isSeller, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
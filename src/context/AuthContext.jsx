import { createContext, useContext, useState } from 'react';
import { apiFetch, getToken, setToken as persistToken, getStoredAdmin, setStoredAdmin } from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [admin, setAdmin] = useState(() => getStoredAdmin());
  const [authError, setAuthError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const login = async (email, password) => {
    setLoggingIn(true);
    setAuthError(null);
    try {
      const data = await apiFetch('/auth/login', { method: 'POST', body: { email, password } });
      persistToken(data.token);
      setStoredAdmin(data.admin);
      setTokenState(data.token);
      setAdmin(data.admin);
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    persistToken(null);
    setStoredAdmin(null);
    setTokenState(null);
    setAdmin(null);
  };

  const value = {
    token,
    admin,
    isAuthenticated: !!token,
    login,
    logout,
    authError,
    loggingIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

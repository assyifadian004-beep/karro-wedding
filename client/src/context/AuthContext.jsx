import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [admin, setAdmin] = useState(() => {
    const raw = localStorage.getItem('admin');
    return raw ? JSON.parse(raw) : null;
  });

  function masuk(tokenBaru, adminBaru) {
    localStorage.setItem('token', tokenBaru);
    localStorage.setItem('admin', JSON.stringify(adminBaru));
    setToken(tokenBaru);
    setAdmin(adminBaru);
  }

  function keluar() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setToken(null);
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ token, admin, masuk, keluar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

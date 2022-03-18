import { useState, useCallback, useEffect } from 'react';
import LocalStorage from '../constants/LocalStorage';
import { Logout } from "../api/auth/Authen";

export const useAuth = () => {
  const [token, setToken] = useState<string>(LocalStorage.getItem("token") ? LocalStorage.getItem("token") : "");
  const [refreshToken, setRefreshToken] = useState<string>(LocalStorage.getItem("refreshToken") ? LocalStorage.getItem("refreshToken") : "");

  const login = useCallback((at, rt) => {
    setToken(at);
    setRefreshToken(rt);
  }, []);

  const logout = useCallback( () => {
    if (token && refreshToken) {
      Logout()
    }
    setToken("");
    setRefreshToken("");
  }, [token, refreshToken]);

  useEffect(() => {
    if (token && refreshToken) {
      login(token, refreshToken);
    } else if (refreshToken) {
      setToken("Token is expired");
    } else if (!token && !refreshToken) {
      logout();
    }
  }, [token, refreshToken]);

  return { token, login, logout }
}
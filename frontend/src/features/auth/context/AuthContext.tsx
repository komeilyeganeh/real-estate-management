import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from "../service/token.service";
import { useNavigate } from "react-router";

interface AuthContextValue {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => getAccessToken(),
  );

  const navigate = useNavigate();

  const login = useCallback(
    (token: string) => {
      saveAccessToken(token);
      setAccessToken(token);
      navigate("/", { replace: true });
    },
    [navigate],
  );

  const logout = useCallback(() => {
    removeAccessToken();
    setAccessToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated: Boolean(accessToken),
      login,
      logout,
    }),
    [accessToken, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
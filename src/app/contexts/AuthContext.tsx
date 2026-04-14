import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { API_ENDPOINTS, buildAuthApiUrl, buildHeaders } from "../../config/api.config";

interface User {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  businessName?: string;
  industry?: string;
  currency?: string;
  timezone?: string;
}

interface AuthContextType {
  user: User | null;
  authReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_TOKEN_KEY = "pricepilot-auth-token";

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({ message: "Unexpected server response." }));

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "Request failed.";

    throw new Error(message);
  }

  return data as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        setAuthReady(true);
        return;
      }

      try {
        const response = await fetch(buildAuthApiUrl(API_ENDPOINTS.USER.PROFILE), {
          method: "GET",
          headers: buildHeaders(token),
        });

        const data = await parseApiResponse<{ user: User }>(response);
        setUser(data.user);
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setUser(null);
      } finally {
        setAuthReady(true);
      }
    };

    void initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(buildAuthApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await parseApiResponse<AuthResponse>(response);
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    setUser(data.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await fetch(buildAuthApiUrl(API_ENDPOINTS.AUTH.SIGNUP), {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ name, email, password }),
    });

    const data = await parseApiResponse<AuthResponse>(response);
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;

    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(buildAuthApiUrl(API_ENDPOINTS.USER.UPDATE_PROFILE), {
      method: "PATCH",
      headers: buildHeaders(token),
      body: JSON.stringify(updates),
    });

    const data = await parseApiResponse<{ message: string; user: User }>(response);
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, authReady, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Types and Interfaces
interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: string;
  lastActivityTimestamp: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
}

interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  age: string;
}

interface AuthProviderProps {
  children: ReactNode;
  autoLogoutTime?: number; // Time in milliseconds, defaults to 24 hours
}

// Constants
const AUTO_LOGOUT_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const AUTH_STORAGE_KEY = 'auth_state';

// Context Creation
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper Functions
const getStoredAuthState = (): AuthState => {
  const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!storedData) return { user: null, loading: false, error: null };

  const { user, lastActivityTimestamp } = JSON.parse(storedData);
  
  // Check if the session has expired
  if (user && lastActivityTimestamp) {
    const now = Date.now();
    if (now - lastActivityTimestamp > AUTO_LOGOUT_TIME) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, loading: false, error: null };
    }
  }
  
  return { user, loading: false, error: null };
};

const updateLastActivity = (state: AuthState) => {
  if (state.user) {
    const updatedState = {
      ...state,
      user: {
        ...state.user,
        lastActivityTimestamp: Date.now()
      }
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedState));
  }
};

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  autoLogoutTime = AUTO_LOGOUT_TIME 
}) => {
  const [state, setState] = useState<AuthState>(getStoredAuthState);

  // Auto-logout check on activity
  useEffect(() => {
    const checkActivity = () => {
      const currentState = getStoredAuthState();
      if (currentState.user) {
        updateLastActivity(currentState);
      }
      setState(currentState);
    };

    // Check on mount and set up activity listeners
    checkActivity();
    
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, checkActivity);
    });

    // Periodic check for session expiration
    const intervalId = setInterval(checkActivity, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, checkActivity);
      });
      clearInterval(intervalId);
    };
  }, [autoLogoutTime]);

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Here you would typically make an API call to validate credentials
      // For now, we'll simulate a successful login
      const user: User = {
        email,
        lastActivityTimestamp: Date.now()
      };

      setState({ user, loading: false, error: null });
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during sign in'
      }));
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Here you would typically make an API call to create the user
      // For now, we'll simulate a successful registration
      const user: User = {
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        gender: credentials.gender,
        age: credentials.age,
        lastActivityTimestamp: Date.now()
      };

      setState({ user, loading: false, error: null });
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during sign up'
      }));
    }
  };

  const signOut = () => {
    setState({ user: null, loading: false, error: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signOut,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
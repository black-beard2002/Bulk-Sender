import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface User {
  email: string;
  password: string; // Optional, you may omit this if it's not stored in state
}

interface UsersContextType {
  user: User | null;
  signIn(email: string, password: string): void;
  signOut(): void;
  signUp(firstname:string,lastname:string,email:string,password:string,gender:string,age:string):void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<UsersContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize state from localStorage during component mount
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // Your authentication logic here
    setUser({ email, password });
    
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const signUp = async (firstname:string,lastname:string,email:string,password:string,gender:string,age:string)=>{
    // Your authentication logic here
    setUser({ email, password });
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify({ email }));
  }
  
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): UsersContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useTemplates must be used within a TemplatesProvider");
  }
  return context;
};

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: 'sender' | 'transporter';
  phone?: string;
  city?: string;
  carLicense?: string;
  vehicleType?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('colisvoyageur_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    const mockUser: User = {
      id: '1',
      email,
      fullName: 'Jean Dupont',
      userType: 'sender',
      phone: '+33 6 12 34 56 78',
      city: 'Paris',
    };
    
    localStorage.setItem('colisvoyageur_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    // TODO: Replace with actual API call
    const { password, ...userInfo } = userData;
    const newUser: User = {
      id: Date.now().toString(),
      email: userInfo.email || '',
      fullName: userInfo.fullName || '',
      userType: userInfo.userType || 'sender',
      phone: userInfo.phone,
      city: userInfo.city,
      carLicense: userInfo.carLicense,
      vehicleType: userInfo.vehicleType,
    };
    
    localStorage.setItem('colisvoyageur_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('colisvoyageur_user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

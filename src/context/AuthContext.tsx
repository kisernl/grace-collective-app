import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

type UserRole = 'client' | 'counselor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface StoredUser extends User {
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // First check for hardcoded demo users
      let mockUser: User | null = null;
      
      if (email === 'counselor@example.com' && password === 'password') {
        mockUser = {
          id: 'c1',
          name: 'Dr. Sarah Johnson',
          email: 'counselor@example.com',
          role: 'counselor'
        };
      } else if (email === 'admin@example.com' && password === 'password') {
        mockUser = {
          id: 'a1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
      } else if (email === 'client@example.com' && password === 'password') {
        mockUser = {
          id: 'cl1',
          name: 'John Client',
          email: 'client@example.com',
          role: 'client'
        };
      } else {
        // If not a demo user, check registered users in localStorage
        const registeredUsers = localStorage.getItem('registeredUsers');
        if (registeredUsers) {
          const users: StoredUser[] = JSON.parse(registeredUsers);
          const foundUser = users.find(u => u.email === email && u.password === password);
          
          if (foundUser) {
            // Don't include password in the auth context user
            mockUser = {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email,
              role: foundUser.role
            };
          }
        }
      }

      if (mockUser) {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if email already exists
      const registeredUsers = localStorage.getItem('registeredUsers');
      let users: StoredUser[] = [];
      
      if (registeredUsers) {
        users = JSON.parse(registeredUsers);
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          return false; // Email already in use
        }
      }
      
      // Create new user
      const newUser: StoredUser = {
        id: uuidv4(),
        name,
        email,
        password, // In a real app, this would be hashed
        role: 'client' // New registrations are always clients
      };
      
      // Add to registered users
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Log in the new user (without the password)
      const userForAuth: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      
      setUser(userForAuth);
      localStorage.setItem('user', JSON.stringify(userForAuth));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

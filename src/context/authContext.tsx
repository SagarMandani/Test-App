import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../common';

type User = {
  name: string;
  email: string;
  password: string;
  logged: boolean;
};

type AuthContextType = {
  loader: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, logged: boolean) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    loadUser();
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const loadUser = async (): Promise<void> => {
    const storedUser = await AsyncStorage.getItem(Constants.Preferences.User);

    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    logged: boolean,
  ): Promise<void> => {
    const newUser: User = { name, email, password, logged };
    await AsyncStorage.setItem(Constants.Preferences.User, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const storedUser = await AsyncStorage.getItem(Constants.Preferences.User);

    if (!storedUser) {
      return false;
    }

    const parsedUser: User = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      const user = { ...parsedUser, logged: true };
      setUser(user);
      await AsyncStorage.setItem(Constants.Preferences.User, JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    const storedUser = await AsyncStorage.getItem(Constants.Preferences.User);
    const parsedUser: User = JSON.parse(storedUser);
    const user = { ...parsedUser, logged: false };
    setUser(user);
    await AsyncStorage.setItem(Constants.Preferences.User, JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        loader,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
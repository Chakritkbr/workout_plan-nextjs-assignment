'use client';

import React, { createContext, useState } from 'react';

interface User {
  id: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialUserState = null;
const initialIsLoggedIn = false;

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: initialUserState,
  isLoggedIn: initialIsLoggedIn,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialUserState);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialIsLoggedIn);

  const contextValue = {
    user,
    isLoggedIn,
    setUser,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

'use client';
import { UserContextProvider } from './context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

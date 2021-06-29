import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { AuthState } from '../types';

export const intialAuthState: AuthState = {
  username: null,
  isLoggedIn: false,
};

export const AuthContext = createContext<{
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
}>({
  authState: intialAuthState,
  setAuthState: () => {},
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState(intialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

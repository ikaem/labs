import { createContext, useState } from 'react';

// TODO type this
export const intialAuthState = {
  username: null,
  isLoggedIn: false,
};

export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState(intialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

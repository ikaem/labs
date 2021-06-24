import { navigate } from '@reach/router';
import { useContext, useEffect } from 'react';
import { AuthContext, intialAuthState } from '../';

// TODO add to constants
const USER = 'borgoth@mordos.com';
const PASS = '12bindthem';

export const useAuth = () => {
  const {
    authState: { username, isLoggedIn },
    setAuthState,
  } = useContext(AuthContext);

  //   TODO type proper
  const login = ({ username, password }: any) => {
    if (username !== USER || password !== PASS) {
      // TODO show errors here with add toast
      return;
    }
    setAuthState({ username, isLoggedIn: true });
    navigate('/home');
    // return; // redirect here
  };

  //   TODO type proper
  const logout = () => {
    setAuthState(intialAuthState);
  };

  return {
    username,
    isLoggedIn,
    login,
    logout,
  };
};

import { useContext } from 'react';
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
      //   TODO add taht JSON server, and then fetch the user
      // TODO show errors here with add toast
      return;
    }
    setAuthState({ username, isLoggedIn: true });
    return; // redirect here
  };

  //   TODO type proper
  const logout = () => {
    setAuthState(intialAuthState);
    return; // redirect here
  };

  return {
    username,
    isLoggedIn,
    login,
    logout,
  };
};

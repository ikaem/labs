import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthContext, intialAuthState } from '../';
import { USER } from '../../../common/constants';
import { LoginCredentials } from '../types';

export const useAuth = () => {
  const history = useHistory();
  const {
    authState: { username, isLoggedIn },
    setAuthState,
  } = useContext(AuthContext);

  //   TODO type proper
  const login = ({ username, password }: LoginCredentials) => {
    if (username !== USER.username || password !== USER.password) {
      // TODO show errors here with add toast
      return;
    }
    setAuthState({ username, isLoggedIn: true });
    history.push('/home');
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

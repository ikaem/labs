import { useContext } from 'react';
import { useHistory } from 'react-router';
import { createLocalStorageStateHook } from 'use-local-storage-state';

import { AuthContext, intialAuthState } from '../';
import { localStorageKeys, USER } from '../../../common/constants';
import { AuthState, LoginCredentials } from '../types';

export const useAuth = () => {
  const useStoredAuth = createLocalStorageStateHook<AuthState>(
    localStorageKeys.AUTH
  );

  const history = useHistory();
  const {
    authState: { username, isLoggedIn },
    setAuthState,
  } = useContext(AuthContext);

  const [_storedAuth, setStoredAuth] = useStoredAuth();

  const loadStoredAuth = (storedAuth: AuthState) => {
    setAuthState(storedAuth);
  };

  const login = ({ username, password }: LoginCredentials) => {
    if (username !== USER.username || password !== USER.password) {
      // TODO show errors here with add toast
      return;
    }
    setAuthState({ username, isLoggedIn: true });
    setStoredAuth({ username, isLoggedIn: true });
    history.push('/home');
  };

  const logout = () => {
    setAuthState(intialAuthState);
    setStoredAuth.reset();
  };

  return {
    username,
    isLoggedIn,
    login,
    logout,
    loadStoredAuth,
    useStoredAuth,
  };
};

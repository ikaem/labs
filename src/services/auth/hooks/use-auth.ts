import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { createLocalStorageStateHook } from 'use-local-storage-state';

import { AuthContext, intialAuthState } from '../';
import { localStorageKeys, USER } from '../../../common/constants';
import { AuthState, LoginCredentials } from '../types';

export const useAuth = () => {
  const useStoredAuth = createLocalStorageStateHook<AuthState>(
    localStorageKeys.AUTH
  );

  const [isLoginError, setIsLoginError] = useState(false);

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
    setIsLoginError(false);
    if (username !== USER.username || password !== USER.password) {
      // TODO show errors here with add toast
      return setIsLoginError(true);
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
    isLoginError,
  };
};

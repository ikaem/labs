export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  username: string | null;
  isLoggedIn: boolean;
}

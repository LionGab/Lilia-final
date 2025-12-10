export interface User {
  email: string;
  loginTimestamp: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}


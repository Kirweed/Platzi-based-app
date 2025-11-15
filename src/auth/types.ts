export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (creds: { email: string; password: string }) => Promise<User>;
  logout: () => void;
}

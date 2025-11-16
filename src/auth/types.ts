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
  createUser: (data: CreateUserDto) => Promise<UserResponse>;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
